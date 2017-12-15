import api from '../../api/products.js'

const state = {
    products: [],
    cart: []
}

// getters
const getters = {
    products: state => state.products,
    cart: state => state.cart,
}

// actions
const actions = {
    getProducts({commit, state}, params) {
        api.getProducts({...params,"_limit": 6}).then(
            response => commit('FETCH_PRODUCTS', response.data)
        )
    },
    addProductToCart({commit, state}, product) {
        commit('ADD_TO_CART', product)
    },
    incr({commit, state}, product) {
        commit('INCREMENT_CART', product)
    },
    del({commit, state}, product) {
        commit('REMOVE_ITEM', product)
    },
    decr({commit, state}, product) {
        if (product.quantity > 1)
            commit('DECREMENT_CART', product)
        else
            commit('REMOVE_ITEM', product)
    },
    restore({commit, state}, lsState) {
        commit('RESTORE', lsState)
    }
}

// mutations
const mutations = {
    FETCH_PRODUCTS(state, data) {
        state.products = data
    },
    ADD_TO_CART(state, product) {
        product = {...product}
        let productInCart;
        for (let p of state.cart) {
            if (p.id === product.id)
                productInCart = p
        }
        if (!productInCart) {
            product.quantity = 1;
            state.cart.push(product)
        }
        else {
            productInCart.quantity++;
        }
    },
    INCREMENT_CART(state, product) {
        product.quantity++
    },
    DECREMENT_CART(state, product) {
        product.quantity--
    },
    REMOVE_ITEM(state, product) {
        for (let i in state.cart) {
            if (state.cart[i].id === product.id) {
                state.cart.splice(i, 1)
            }
        }
    },
    RESTORE(state, lsState) {
        state.cart = Array.isArray(lsState) ? lsState : []
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}

