import scraper.scraper as scraper
import scraper.parser as parser
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    scraper.main()
    parser.main()
