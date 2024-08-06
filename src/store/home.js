import { commonInitialState, commonGetters, commonMutations } from "./common"
import useFirebaseDataStore from "@/services/firebase-request"
const initialState = () => {
    return {
        ...commonInitialState,
        invoiceList: [],
        clientDetails: [],
        itemList: [],
    }
}
const getters = {
    ...commonGetters,
    invoiceList: state => state.invoiceList,
    clientDetails: state => state.clientDetails,
    itemList: state => state.itemList
}

const actions = {
    async GET_INVOICE_LIST({ commit }) {
        commit('RESET_RESPONSE_FLAG')
        try {
            const { getFromFirebaseStore } = useFirebaseDataStore();
            const invoiceList = await getFromFirebaseStore('invoices');
            commit('SET_INVOICE_LIST', invoiceList);
        } catch (error) {
            console.log(error);
        }
    },
    async GET_SINGLE_INVOICE({ commit }, params) {
        commit('RESET_RESPONSE_FLAG')
        try {
            const { getSingleDetailFromFirebase } = useFirebaseDataStore();
            const clientDetails = await getSingleDetailFromFirebase('invoices', params);
            commit('SET_CLIENT_DETAILS', clientDetails);
        } catch (error) {
            console.log(error);
        }
    },
    async SUBMIT_INVOICE_DETAILS({ commit }, params) {
        const { setToFirbaseStore } = useFirebaseDataStore();
        commit('RESET_RESPONSE_FLAG')
        try {
            await setToFirbaseStore('invoices', params);
            commit('SET_SUCCESS', "Invoice saved successfully")
        } catch (error) {
            console.log(error);
        }
    },
    async UPDATE_INVOICE_DETAILS({ commit }, params) {
        const { setToFirbaseStore } = useFirebaseDataStore();
        commit('RESET_RESPONSE_FLAG')
        try {
            await setToFirbaseStore('invoices', params);
            commit('SET_SUCCESS', "Invoice saved successfully")
        } catch (error) {
            console.log(error);
        }
    }
}

const mutations = {
    ...commonMutations,
    SET_INVOICE_LIST(state, value) {
        state.invoiceList = value;
    },
    SET_CLIENT_DETAILS(state, value) {
        state.clientDetails = value;
    },
    SET_ITEM_LIST(state, value) {
        state.itemList = value;
    }
}
export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}