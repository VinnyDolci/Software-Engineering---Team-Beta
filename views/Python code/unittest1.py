from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome('/Users/djankie/driver-ex/chromedriver')

driver.get("http://teambeta.pythonanywhere.com/login")
print(driver.title)

username = driver.find_element_by_name("test")
username.send_keys("test")
username.submit()


time.sleep(5)

driver.quit()