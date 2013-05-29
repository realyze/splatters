/**
 * Returns a handler function using lexical dispatching.
 *
 * params:
 *     prefix: String. The prefix used to find the handler.

 *     notFoundFun: Function. Called with the `key` parameter when the
 *         handler function is not found.

 *     context: Object. Context for the dispatcher. Used when searching
 *         for the handler function.
 *
 *     Example:
 *         var dispatcher = createLexicalDispatcher('foo_', null, obj);
 *         dispatcher('bar', 42);
 *         // Calls `obj.foo_bar(42)`
 *
 */
function createDispatcher(prefix, notFoundFun, context) {
  if ( ! prefix || typeof(prefix) != 'string')) {
      return false;
  }

  return function(key) {
      var handler;

      context = context || this;

      notFoundFun = notFoundFun || function() {
        throw new Error('Handler for ' + key + ' not found.');
      }

      handler = context[prefix + key];

      if ( ! typeof(handler) == 'function') {
          return notFoundFun.call(context, key);
      }

      // Remove the `key` param from arguments.
      Array.prototype.shift.call(arguments);

      // Handler function found, call it with all the parameters expcept the key.
      return handler.apply(context, arguments);
  }
