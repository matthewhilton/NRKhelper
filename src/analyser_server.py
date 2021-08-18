import nltk
import json
import falcon
from wsgiref import simple_server

class Analyser:
    def on_post(self, req, resp):
        resp.media = analyse_sentence(req.media['sentence'])

def analyse_sentence(sentence):
    stemmer = nltk.stem.SnowballStemmer('norwegian');

    tokens = nltk.word_tokenize(sentence)
    stems = list(map(lambda token: stemmer.stem(token), tokens))
    pos = nltk.pos_tag(tokens)

    response = dict()

    # Format response as JSON
    response['tokens'] = tokens;
    response['stems'] = stems;
    response['pos'] = pos;

    return response


app = falcon.App()
app.add_route('/', Analyser())

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 9000, app)
    httpd.serve_forever()