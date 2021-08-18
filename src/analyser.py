import nltk
import argparse
import json
import sys

stemmer = nltk.stem.SnowballStemmer('norwegian');

# Command line arguments
parser = argparse.ArgumentParser(description='A tutorial of argparse!')
parser.add_argument("--s", required=True, type=str, help="Sentence to analyse")

args = parser.parse_args()

# Processing
tokens = nltk.word_tokenize(args.s)
stems = list(map(lambda token: stemmer.stem(token), tokens))
pos = nltk.pos_tag(tokens)

response = dict()

# Format response as JSON
response['tokens'] = tokens;
response['stems'] = stems;
response['pos'] = pos;

response_json = json.dumps(response, ensure_ascii=False)

sys.stdout.write(response_json);