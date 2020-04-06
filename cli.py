import csv
import os
import sys

import fire

import analyze


SRC_DIR = 'news/docs/data'
DATA_DIR = 'docs/_data'

FIELDS = [
    'date', 'article_id', 'original_url', 'daum_url', 'image_url',
    'cp_url', 'cp_name', 'title', 'description', 'author', 'keywords',
    'tags',
]


class CLI:
    """News analyzer"""
    def analyze(self):
        """기사 전체를 분석하여 분류 태그를 추가한 후 별도 파일로 저장"""
        articles = self._analyze_articles(self._get_articles())
        os.makedirs(DATA_DIR, exist_ok=True)
        with open(os.path.join(DATA_DIR, 'articles.csv'), 'w') as f:
            csvw = csv.DictWriter(f, FIELDS)
            csvw.writeheader()
            csvw.writerows(articles)

    def test(self, tag):
        """기사 전체 중 특정 분류에 속하는 기사만 출력. 개발 중 테스트용"""
        articles = (
            a for a in self._analyze_articles(self._get_articles())
            if tag in a['tags']
        )
        csvw = csv.DictWriter(sys.stdout, FIELDS)
        csvw.writeheader()
        csvw.writerows(articles)

    def _get_articles(self):
        """Yields all articles in SRC_DIR"""
        for filename in sorted(os.listdir(SRC_DIR)):
            date = filename[:-4]
            with open(os.path.join(SRC_DIR, filename), 'r') as f:
                csvr = csv.DictReader(f)
                for article in csvr:
                    article['date'] = date
                    yield article

    def _analyze_articles(self, articles):
        """Analyze articles"""
        for article in articles:
            tags = analyze.analyze_article(article)
            if len(tags) > 0:
                article['tags'] = ';'.join(tags)
                yield article


if __name__ == '__main__':
    fire.Fire(CLI())

