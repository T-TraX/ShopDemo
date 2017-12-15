<template>
    <section class="cart">
        <div class="cart-list-container" v-if="cart && cart.length">
            <ul class="cart-list">
                <li class="cart-list-item" v-for="item in cart" v-if="item.quantity > 0">
                    <div class="d-flex">
                        <div class="cart-list-item__image">
                            <img :src="item.photo">
                            <div class="del" @click="del(item)">
                                <i class="material-icons">clear</i>
                            </div>
                        </div>
                        <div class="cart-list-item__content">
                            <div class="cart-list-item__title">
                                {{ item.name }}
                            </div>
                            <div class="cart-list-item__quantity">
                                Quantity: <b>{{ item.quantity }}</b>
                            </div>
                        </div>
                        <div class="cart-list-item__actions">
                            <div class="plus" @click="incr(item)">
                                <i class="material-icons">add</i>
                            </div>
                            <div class="minus" @click="decr(item)">
                                <i class="material-icons">remove</i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="cart-total">
                <div class="alert alert-secondary" role="alert">
                    Total price: <span v-price="total"></span>
                </div>
            </div>
        </div>
        <div class="alert alert-info" role="alert" v-else>
            Cart is empty! Add some products
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "cart",
        computed: {
            ...mapGetters({
                cart: 'cart'
            }),
            total() {
                let sum = 0
                for (let c of this.cart) {
                    sum += (c.price * c.quantity)
                }
                return sum
            }
        },
        watch: {
            cart: {
                handler(v) {
                    localStorage.cart = JSON.stringify(v)
                },
                deep: true
            }
        },
        methods: {
            ...mapActions(['incr', 'decr', 'del', 'restore'])
        },
        mounted() {
            let cart,
                localCart = localStorage.cart,
                lsState = '[]';
            if (lsState && lsState !== null) {
                try {
                    lsState = JSON.parse(localCart)
                }
                catch (e) {
                    console.error(e)
                }
            }
            this.restore(lsState)
        }
    }
</script>

<style lang="scss" scoped>
    .cart {
        padding: 20px;
    }

    .cart-list-item {
        text-align: left;
        display: block;
        padding: 5px 0;
        &:not(:last-child) {
            border-bottom: 1px solid #e5e5e5;
        }
        &__image {
            width: 50px;
            flex: 1 0 auto;
            margin-right: 10px;
            position: relative;
        }
        &__content {
            font-size: 12px;
            width: 100%;
        }
        &__actions {
            .plus, .minus {
                cursor: pointer;
            }
            i {
                font-size: 12px;
            }
            .plus i {
                color: var(--green);
            }
            .minus i {
                color: var(--red);
            }
        }
    }

    .del {
        display: inline-block;
        position: absolute;
        left: 3px;
        top: 3px;
        top: 0;
        left: 0;
        background: #fff;
        width: 15px;
        height: 15px;
        line-height: 12px;
        text-align: center;
        border: 1px solid var(--red);
        cursor: pointer;
        transition: .2s ease-in-out;
        &:hover {
            background: var(--red);
            i {
                color: #fff;
            }
        }
        i {
            transition: inherit;
            color: var(--red);
            font-size: 10px;
        }
    }
</style>
