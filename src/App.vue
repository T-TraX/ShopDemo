<template>
    <div id="app" :class="{'cart-active':cartActive}">
        <header class="header">
            <div class="container d-flex justify-content-between align-items-center">
                <img src="//satyr.io/250x70?text=shop" alt="Logotype">
                <div class="toggle-cart" @click="cartActive = !cartActive" :data-quantity="quantity">
                    <i class="material-icons">shopping_cart</i>
                </div>
            </div>
        </header>
        <div class="page-container" @click="cartActive = false">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-3">Shop demo</h1>
                    <p class="lead">Based on Vue.js + Vuex</p>
                </div>
            </div>
            <products-list></products-list>
        </div>
        <div class="cart-container">
            <cart></cart>
        </div>
    </div>
</template>

<script>
    import ProductsList from './components/productsList.vue'
    import Cart from './components/cart.vue'
    import store from './store'

    export default {
        name: 'app',
        data() {
            return {
                cartActive: false
            }
        },
        store,
        components: {
            ProductsList,
            Cart
        },
        computed:{
            quantity(){
                return this.$store.getters.cart.length
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Lato', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .page-container {
        min-height: 100vh;
        padding-top: 111px;
        padding-bottom: 50px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    img {
        max-width: 100%;
    }

    .header {
        text-align: left;
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 4;
        transition: .2s ease-in-out;
    }

    .toggle-cart {
        padding: 10px;
        margin-top: 3px;
        border: 1px solid #000;
        border-radius: 3px;
        background: var(--blue);
        transition: .2s ease-in-out;
        cursor: pointer;
        position: relative;
        &:after{
            content: attr(data-quantity);
            position: absolute;
            bottom: -10px;
            right: -10px;
            background: var(--red);
            font-size: 14px;
            color: #fff;
            width: 20px;
            text-align: center;
            line-height: 20px;
            z-index: 3;
            border-radius: 50%;
        }
        &:hover {
            background: var(--green);
        }
        i {
            color: #fff;
            vertical-align: middle;
        }
    }

    .cart-container {
        width: 300px;
        position: fixed;
        height: 100vh;
        display: block;
        border-left: 1px solid #000;
        overflow-y: scroll;
        background: #fff;
        right: 0;
        top: 0;
        z-index: 3;
        transform: translateX(100%);
        transition: .2s ease-in-out;
    }

    .page-container {
        transition: .2s ease-in-out;
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(#000, 0.7);
            top: 0;
            left: 0;
            transition:.2s ease-in-out;
            opacity: 0;
            pointer-events: none;
        }
    }

    .cart-active {
        .cart-container {
            transform: translateX(0);
        }
        .page-container, .header {
            transform: translateX(-300px);
        }
        .page-container:after {
            opacity: 1;
        }
    }
</style>
