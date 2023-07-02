import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.NEXT_PUBLIC_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const client =
  serviceDomain && apiKey
    ? createClient({
        serviceDomain: serviceDomain,
        apiKey: apiKey,
      })
    : null;

export default client;
