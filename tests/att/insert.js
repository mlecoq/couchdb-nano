var vows     = require('/usr/lib/node_modules/vows/lib/vows')
  , assert   = require('assert')
  , async    = require('async')
  , cfg      = require('../../cfg/tests.js')
  , nano     = require('../../nano')(cfg);

function db_name(i) { return "att_in" + i; }
function db(i) { return nano.use(db_name(i)); }

/*****************************************************************************
 * att_new_doc                                                               *
 *****************************************************************************/
function att_doc(callback) {
  nano.db.create(db_name("a"), function () {
    db("a").attachment.insert("new", "att", "Hello World!", "text/plain", callback);
  });
}

function att_doc_ok(e,h,b) {
  nano.db.destroy(db_name("a"));
  assert.isNull(e);
  assert.ok(b.ok);
  assert.equal(b.id, "new");
}

/*****************************************************************************
 * att_doc                                                                   *
 *****************************************************************************/
  // Same but on existing doc with rev

vows.describe('attachment.insert').addBatch({
  "att_doc": {
    topic: function () { att_doc(this.callback); }
  , "=": att_doc_ok }
}).exportTo(module);
