from selenium import webdriver

driver = webdriver.Chrome('/driver-ex/chromedriver')

driver.get("http://teambeta.pythonanywhere.com/")
print(driver.title)
driver.quit()