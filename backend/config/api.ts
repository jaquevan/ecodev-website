module.exports = ({ env }) => ({
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },

  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    }
  }
});
