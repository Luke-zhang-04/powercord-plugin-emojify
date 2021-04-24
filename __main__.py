import scraper.scraper as scraper
import scraper.parser as parser
import sys
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    if "--noScrape" not in sys.argv:
        scraper.main()
    parser.main()
