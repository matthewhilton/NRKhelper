import falcon
from wsgiref import simple_server
import spacy
from spacy.morphology import Morphology

# Load training for Norwegan Bokmål
nlp = spacy.load("nb_core_news_sm")

class Analyser:
    def on_post(self, req, resp):
        resp.media = analyse_sentence(req.media['sentence'])

def analyse_sentence(sentence):
    doc = nlp(sentence)

    response = {
        'tokens': [],
        'lemma': [],
        'pos': [],
        'morph': []
    }

    for token in doc:
        response['tokens'].append(token.text)
        response['lemma'].append(token.lemma_)
        response['pos'].append(token.pos_)
        response['morph'].append(Morphology.feats_to_dict(str(token.morph)))

    return response


app = falcon.App()
app.add_route('/', Analyser())

if __name__ == '__main__':
    httpd = simple_server.make_server('localhost', 9000, app)
    httpd.serve_forever()