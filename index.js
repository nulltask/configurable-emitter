
/**
 * Module dependencies.
 */

try {
  var Emitter = require('emitter');
} catch (e) {
  var Emitter = require('component-emitter');
}

/**
 * Make `obj` configurable.
 *
 * @param {Object} obj
 * @return {Object} the `obj`
 * @api public
 */

module.exports = function(obj){

  /**
   * Mixin `Emitter`.
   */

  Emitter(obj);

  /**
   * Mixin settings.
   */

  obj.settings = {};

  /**
   * Set config `name` to `val`, or
   * multiple with an object.
   *
   * @param {String|Object} name
   * @param {Mixed} val
   * @return {Object} self
   * @api public
   */

  obj.set = function(name, val, opts){
    opts = opts || {};
    opts.silent = (opts.silent === true)

    if (1 == arguments.length) {
      for (var key in name) {
        this.set(key, name[key], { silent: true });
        if (!opts.silent) this.emit('set:' + key, name[key]);
      }
      if (!opts.silent) this.emit('set', name);
    } else {
      this.settings[name] = val;
      var obj = {};
      obj[name] = val;
      if (!opts.silent) {
        this.emit('set:' + name, val);
        this.emit('set', obj);
      }
    }

    return this;
  };

  /**
   * Get setting `name`.
   *
   * @param {String} name
   * @return {Mixed}
   * @api public
   */

  obj.get = function(name){
    return this.settings[name];
  };

  /**
   * Enable `name`.
   *
   * @param {String} name
   * @return {Object} self
   * @api public
   */

  obj.enable = function(name){
    return this.set(name, true);
  };

  /**
   * Disable `name`.
   *
   * @param {String} name
   * @return {Object} self
   * @api public
   */

  obj.disable = function(name){
    return this.set(name, false);
  };

  /**
   * Check if `name` is enabled.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  obj.enabled = function(name){
    return !! this.get(name);
  };

  /**
   * Check if `name` is disabled.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  obj.disabled = function(name){
    return ! this.get(name);
  };

  return obj;
};
