# Fillout API Server

This is a simple REST API server that interacts with the Fillout.com API to fetch form responses and provides an option to filter the responses based on custom parameters. It is built using Node.js and Express.js.

## Goals

The Fillout API Server aims to achieve the following goals:

1. **Efficient Retrieval**: Provide a fast and efficient mechanism to fetch form responses from the Fillout.com API.

2. **Flexible Filtering**: Implement a filtering functionality that allows users to retrieve specific form responses based on custom parameters.

3. **Scalability**: Ensure that the server is designed to handle a high volume of API requests and can scale effectively as the user base grows.

4. **Code Quality**: Maintain high code quality standards by following best practices for Node.js and Express.js development, ensuring readability, maintainability, and performance.

5. **Documentation**: Provide comprehensive and clear documentation to assist developers in understanding the API endpoints, query parameters, and usage examples.

## Requirements

To run the Fillout API Server, the following requirements must be met:

1. **Node.js**: Node.js version 16.19.0 or later must be installed on the server.

2. **Dependencies**: Install the required dependencies by running `npm install` in the project root directory.

3. **Fillout.com API Key**: Obtain an API key from Fillout.com to access the form response data.

## Installation

To install and run the Fillout API Server, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/austinL394/fillout-hometask.git

2. Run the app

   ```shell
   npm start
3. Run the app in dev mode

   ```shell
   npm run dev
   ```


# Usage

## Fetching Form Responses

To fetch form responses without filters, make a GET request to `/:formId/filteredResponses`.
GET /:formId/filteredResponses

Query Parameters:

- `filters` (optional): Custom parameters used to search for specific responses.
- `limit` (optional): The maximum number of responses to retrieve per request. Must be a number between 1 and 150. Default is 150.
- `afterDate` (optional): A date string to filter responses submitted after this date.
- `beforeDate` (optional): A date string to filter responses submitted before this date.
- `offset` (optional): The starting position from which to fetch the responses. Default is 0.
- `status` (optional): Pass `in_progress` to get a list of in-progress (unfinished) submissions. By default, only finished submissions are returned.
- `includeEditLink` (optional): Pass `true` to include a link to edit the submission as `editLink`.
- `sort` (optional): Can be `asc` or `desc`, defaults to `asc`.

This API also supports the existing FilloutAPI query parameters by default.

By utilizing these query parameters, you can effectively filter and retrieve the desired form responses.