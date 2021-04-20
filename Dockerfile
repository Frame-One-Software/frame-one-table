FROM node:14.4.0-alpine

# Create Directory and navigate to it
WORKDIR /usr/src/frame-one-table

# Copy over files package.json files and install libraries
COPY package*.json ./
RUN npm install

# Copy over working files
COPY ./ ./

# expose port
EXPOSE 6006

# run storybook
CMD ["npm", "run", "storybook"]
