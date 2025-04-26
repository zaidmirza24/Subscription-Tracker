import {Client as WorkFlowClient } from "@upstash/workflow"

import { QSTASH_URL,QTASH_TOKEN } from "./env.js"

export const workflowClient = new WorkFlowClient({
    baseUrl:QSTASH_URL,
    token:QTASH_TOKEN,
})