from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import re
import csv
import pandas


# replace with your path.
driver = webdriver.Chrome("/Users/o0flame/PycharmProjects/HealthPro/driver/chromedriver")

driver.set_page_load_timeout(10) #num of sec

driver.get("http://gnc.com")
driver.find_element_by_name("q").send_keys("Calcium")
driver.find_element_by_name("q").send_keys(Keys.ENTER)
#driver.find_element_by_name("btnK").send_keys(Keys.ENTER)
#driver.find_element_by("btnK").click()
#element = driver.find_element_by_name("XS4Rbf")
#print(element.text)

eList = driver.find_elements_by_class_name("product-tile")

count =0

# need to store name, price, serving size,link.
product_names = []
price_list =[]
serving_size_list=[]
unit_price=[]
url_links=[]

for e in eList:
    name = e.find_element_by_class_name("product-name")
    #print(name.text)
    urls = e.find_elements_by_tag_name("a")
    link =""
    for b in urls: #print(b.get_attribute("href"))
        link = b.get_attribute("href")
    #print(link)


    price = e.find_element_by_class_name("product-standard-price")
    #print(price.text)

    size=e.find_element_by_class_name("serving-size")
    sentence = size.text.split("/")
    after = sentence[1]
    after = int(re.search(r'\d+', after).group()) # stands for serving size
    #print(after)
    #print(size.text)
    print(e.text) # print all info in text

    product_names.append(name.text)
    price_list.append(price.text)
    serving_size_list.append(after)

    #print(float(price.text[1:])/float(after))   unit price for each serving
    unit_price.append(float(price.text[1:])/float(after))
    url_links.append(link)


    count += 1
    if count==60:
        break


df = pandas.DataFrame(data={"col1": product_names, "col2": price_list, "col3": serving_size_list, "col4": unit_price, "col5": url_links})
df.to_csv("./output.csv", sep=',',index=False)


time.sleep(10)  # live for 10s
driver.quit()
