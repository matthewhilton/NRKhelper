FROM nikolaik/python-nodejs:python3.9-nodejs16

WORKDIR /usr/src/app

# Install Python dependencies
RUN pip3 install falcon
RUN pip3 install --upgrade pip setuptools wheel
RUN pip3 install --upgrade spacy
RUN python -m spacy download nb_core_news_sm

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --production

# Copy everything else
COPY . .

EXPOSE 80

CMD ["node", "server.js"]