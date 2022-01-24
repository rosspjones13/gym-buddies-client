/**
 * Appends REQUEST async action type
 */

export const REQUEST = (actionType) => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 */

export const SUCCESS = (actionType) => `${actionType}_PENDING`;

/**
 * Appends FAILURE async action type
 */

export const FAILURE = (actionType) => `${actionType}_PENDING`;

/**
 * Other action types run through here
 */

export const action = (type, payload) => ({ type, payload });
