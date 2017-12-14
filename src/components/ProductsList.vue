<template>
    <section class="products-list">
        <pre>
            {{$store.cart}}
        </pre>

        <div class="container">
            <h1>Our Products</h1>
            <div class="group">
                Group by:
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn" :class="{'btn-primary':(sort==='name')}" @click="setSort('name')">Name</button>
                    <button type="button" class="btn" :class="{'btn-primary':(sort==='price')}" @click="setSort('price')">Price</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 col-md-4" v-for="product in products">
                    <div class="card">
                        <img class="card-img-top" :src="product.photo" alt="">
                        <div class="card-body">
                            <h4 class="card-title">{{ product.name }}</h4>
                            <p class="card-text" v-price="product.price"></p>
                            <button class="btn btn-primary" @click="addToCart(product)">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <nav aria-label="Nav">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" @click.prevent="goPrev">Previous</a></li>
                    <li class="paging">
                        Page {{page}} of {{maxPages}}
                    </li>
                    <li class="page-item"><a class="page-link" @click.prevent="goNext">Next</a></li>
                </ul>
            </nav>
        </div>


    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "products-list",
        methods: {
            ...mapActions([
                'getProducts',
                'addProductToCart'
            ]),
            addToCart(id) {
                this.addProductToCart(id)
            },
            goPrev() {
                this.page = Math.max(1, --this.page)
                this.getProductsWithParams()
            },
            goNext() {
                this.page = Math.min(this.maxPages, ++this.page)
                this.getProductsWithParams()
            },
            setSort(opt) {
                this.order = (this.sort === opt) ? (this.reverseOrder(this.order)) : 'asc';
                this.sort = opt;
                this.getProductsWithParams()
            },
            getProductsWithParams(){
                this.getProducts({
                    "_page":this.page,
                    "_sort":this.sort,
                    "_order":this.order
                })
            },
            reverseOrder(order){
                return (order === 'asc') ? 'desc' : 'asc'
            }
        },
        computed: {
            ...mapGetters({
                products: 'products'
            })
        },
        mounted() {
            this.getProducts({
                "_page":this.page
            })
        },
        data() {
            return {
                page: 1,
                maxPages: 3,
                sort:'name',
                order:'asc'
            }
        },
    }
</script>

<style scoped lang="scss">
    h1 {
        margin-bottom: 20px;
    }

    .pagination {
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
    }
    .card{
        margin: 15px 0;
    }
    .paging{
        padding: 5px 0;
    }
</style>
