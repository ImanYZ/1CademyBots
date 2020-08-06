import WikiArticleHelper
import MicrosoftResearchApi

'''

THIS IS DIRECTLY FROM THE NOTES IN THE TEAMS CHAT 

Please implement a module that iterates through each of the "Pages" in this article. Note that you need to click the nextPage button programmatically to go through multiple pages.
	Create two empty lists pagesToPropose and potentialPages.
	For each Wikipedia article (page), call IsWikipageAppropriate to figure out whether to include the page and get its metadata.
	
		
Retrieve the list of prerequisites, using the module that Figueroa, Nicolas is working on.
			Add the page to the list potentialPages
	
	Iterate through the following until the length of potentialPages does not change anymore:
		
For each article in potentialPages:
			
if there is at least one prerequisite that exists in pagesToPropose or there exists a similar node on 1Cademy (the dictionary generated from nodes.csv), then include that page in pagesToPropose.
			otherwise, include the page in potentialPages
	
	pagesToPropose at the end contains the list of pages that should be submitted as proposals to 1Cademy
'''

#TODO 
#
# This function should loop through the list of pages from GetPagesFromCategory and 
# check each page with IsArticleAppropriate
# 
# return a dictionary where the key is the Article Title i.e. http://en.wikipedia.org/wiki/[Article Title] and the value is a list of pre-requisites 
# retrieved using WikiArticleHelper.GetPrerequisitesFromArticle
def GetPotentialPages():
	pass

#TODO This is the main structure of our bot
# 
# 1.Iterate through the pages returned by WikiArticleHelper.GetPagesFromCategory("Epidemiology", True)
# Regardless of the implementation it will return a list of wiki pages without 'http://en.wikipedia.org/wiki/'
#
# 2.Call WikipediaScrapingLibrary.IsWikipageAppropriate on each to determine if the article is acceptable for use
#
# 3. If the article is acceptable put it into our list of potential pages
# 
# 4. Loop through each page in the list of potential pages and check it against our nodes.csv 
#  
def start():
	pass