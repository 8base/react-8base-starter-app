import { Client } from '@8base/api-client';

/* Instantiate new instance with workspace endpoint */
export const client = new Client(process.env.REACT_APP_WORKSPACE_ENDPOINT);
