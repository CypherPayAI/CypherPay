/* istanbul ignore file */

/**
 * MCP Adapter
 * Defines tool shapes; runtime wiring happens in a later release.
 */

export interface McpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
}

/** Returns the VERIX402 tool catalog for MCP hosts. */
export function registerVerix402Tools(): McpTool[] {
  const negotiate: McpTool = {
    name: 'verix402.negotiate',
    description: 'Negotiate terms (price, duration, usage, attribution_required).',
    inputSchema: {
      type: 'object',
      properties: {
        resource: { type: 'string' },
        desired: {
          type: 'object',
          properties: {
            price: { type: 'string' },
            duration: { type: 'number' },
            usage: { type: 'string' },
            attribution_required: { type: 'boolean' }
          },
          required: ['price', 'duration', 'usage', 'attribution_required']
        }
      },
      required: ['resource', 'desired']
    },
    async handler(input) {
      return { ok: false, reason: 'not_wired', echo: input };
    }
  };

  const pay: McpTool = {
    name: 'verix402.pay',
    description: 'Initiate a payment for an agreement.',
    inputSchema: {
      type: 'object',
      properties: {
        agreement_id: { type: 'string' },
        provider: { type: 'string', enum: ['x402', 'stripe'] }
      },
      required: ['agreement_id', 'provider']
    },
    async handler(input) {
      return { ok: false, reason: 'not_wired', echo: input };
    }
  };

  const verify: McpTool = {
    name: 'verix402.verify',
    description: 'Verify session, purpose binding, and attribution for a resource.',
    inputSchema: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
        dpop: { type: 'string' },
        purpose: { type: 'string' },
        resource: { type: 'string' }
      },
      required: ['authorization', 'purpose', 'resource']
    },
    async handler(input) {
      return { ok: false, reason: 'not_wired', echo: input };
    }
  };

  return [negotiate, pay, verify];
}
