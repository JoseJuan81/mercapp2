import { FetchClass } from ".";

class FetchExpense extends FetchClass {
    constructor(urlExpense) {
        super()
        this.url = this.urlBase + urlExpense;
    }

    new( body ) {
        const url = this.url + '/new';
        return this.buildPostOrPutFetch( url, body, 'PUT' ).then( res => res.json() );
    }

    update( body ) {
        const { _id, ...rest } = body;
        const url = this.url + '/update-one/' + _id;
        return this.buildPostOrPutFetch( url, rest, 'PUT' ).then( res => res.json() );
    }

    /**
     * 
     * @param { string } expenseId 
     * @returns { array }
     */
    delete( expenseId ) {
        const url = this.url + '/remove/' + expenseId;
        return this.buildDeleteFetch( url ).then( res => res.json() );
    }
}

export const fetchExpense = new FetchExpense('/expenses');