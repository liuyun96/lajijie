# -*- coding: utf8 -*-
# Filename: accesslog_process.py
from datetime import date, timedelta
import re
import MySQLdb
import sys
import traceback
import urllib2
import json
from json import *

reload(sys) 
sys.setdefaultencoding('utf-8') 

class Spider:
    
    def __init__(self):
        self.url = 'http://m.zhe800.com/'
        self.headers = {
            "Referer":"http://m.zhe800.com/",
            "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; rv:6.0.2) Gecko/20100101 Firefox/6.0.2"
        }
    def process(self):
           conn = MySQLdb.connect(host='127.0.0.1', user='root', passwd='baijunli', charset="utf8", db="lajijie", use_unicode=True)
           conn.autocommit(True)
           cursor = conn.cursor()
           for i in range(2, 100):
               reqPv = urllib2.Request(url=self.url + 'api/deal?page=' + str(i), headers=self.headers)
               content = urllib2.urlopen(reqPv).read()
               # 方法返回了一个str对象encodedjson
               # encodedjson = json.dumps(contentPv)
               # encodedjson进行decode 得到原始数据
               # decodejson = json.loads(encodedjson)
               
               # dict = JSONDecoder().decode(encodedjson)
               
               # dict = json.read(encodedjson)
               # print decodejson[0]['id']
               
               items = json.loads(content, "utf-8")
               # brType = items["data"]["cate0"]["brType"];
               for item in items:
                   id = item['id'];
                   title = item['title'];
                   short_title = item['short_title'];
                   # 大图片
                   deal_image = item['deal_image'];
                   # 商品小图片
                   image_url = item['image_url'];
                   baoyou = item['baoyou'];
                   recommend_reason = item['recommend_reason'];
                   origin_deal_url = item['origin_deal_url'];
                   price = item['price'];
                   list_price = item['list_price'];
                   cursor.execute("""insert into ITEM (item_id,title,short_title,pic_path,recommend_reason,original_url,price,list_price) values (%s,%s,%s,%s,%s,%s,%s,%s) """,
                                  (id, title, short_title, image_url, recommend_reason, origin_deal_url, price, list_price))
           conn.close();
spider = Spider();
spider.process()

