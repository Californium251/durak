const _ = require('lodash');

const isCardAllowed = (card, table) => {
    if (table.length === 0) {
        return true;
    }
    return _.flatten(table).map((c) => c ? c.rank : null).includes(card ? card.rank : null);
}

module.exports = isCardAllowed;
