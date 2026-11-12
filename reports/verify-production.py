import json, pathlib, collections, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlsplit
root=pathlib.Path('/Users/ashokreddy/ashok-portfolio')
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.meta={};self.canonical=[];self.links=[];self.images=[];self.h1=0;self.head=False;self.title=False;self.name='';self.ld=False;self.schemas=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='head':self.head=True
  if t=='title' and self.head:self.title=True
  if t=='meta':self.meta[d.get('name',d.get('property'))]=d.get('content','')
  if t=='link' and d.get('rel')=='canonical':self.canonical.append(d['href'])
  if t=='a':self.links.append(d.get('href',''))
  if t=='img':self.images.append(d)
  if t=='h1':self.h1+=1
  if t=='script':self.ld=d.get('type')=='application/ld+json'
 def handle_endtag(self,t):
  if t=='head':self.head=False
  if t=='title':self.title=False
  if t=='script':self.ld=False
 def handle_data(self,s):
  if self.title:self.name+=s
  if self.ld:
   data=json.loads(s);self.schemas.extend(data if isinstance(data,list) else [data])
pages={}
for f in (root/'.next/server/app').rglob('*.html'):
 rel=f.relative_to(root/'.next/server/app').as_posix()[:-5]
 if rel.startswith('_'):continue
 route='' if rel=='index' else '/'+rel
 p=Page();p.feed(f.read_text());pages[route]=p
 assert p.h1==1,(route,'h1',p.h1)
 assert p.canonical==['https://ashokreddykundurru.com'+route],(route,p.canonical)
 assert p.name and p.meta.get('description'),route
 assert p.meta.get('og:image') and p.meta.get('twitter:image'),route
 assert all(im.get('alt') and im.get('width') and im.get('height') for im in p.images),route
 assert 'nofollow' not in p.meta.get('robots',''),route
 person=next(s for s in p.schemas if s.get('@type')=='Person')
 assert person['name']=='Ashok Reddy Kundurru' and len(person['sameAs'])==6
 assert any(s.get('@type')=='WebSite' for s in p.schemas)
for route,p in pages.items():
 for link in p.links:
  if link.startswith('/') and not link.startswith('//'):
   path=urlsplit(link).path.rstrip('/')
   assert path in pages or (root/'public'/path.lstrip('/')).exists(),(route,'broken link',link)
for field in ['name','description']:
 vals=[p.name if field=='name' else p.meta['description'] for p in pages.values()]
 assert len(vals)==len(set(vals)),('duplicate',field)
sitemap=ET.parse(root/'.next/server/app/sitemap.xml.body')
urls=[e.text for e in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
expected=['https://ashokreddykundurru.com'+r for r,p in pages.items() if 'noindex' not in p.meta.get('robots','')]
assert set(urls)==set(expected) and len(urls)==len(set(urls))
original=pathlib.Path('/Users/ashokreddy/Downloads/google29dc148db9bac5ef.html').read_bytes()
assert (root/'.open-next/assets/google29dc148db9bac5ef.html').read_bytes()==original
print(f'PASS: {len(pages)} pages, {len(urls)} sitemap URLs; unique titles/descriptions/canonicals, H1s, image alt/dimensions, share metadata, schema, internal links, draft exclusions and verification asset.')
