<template>
    <nav>
        <div class="nav-wrapper green">
            <div class="container">
                <router-link to = "/" class = 'brand-logo'>Менеджер заказов</router-link>
                <ul class="right">
                    <li v-if="isLoggedIn"><span class = "email black-text">{{currentUser}}</span></li>
                    <li v-if="isLoggedIn"> <router-link to= "/">Главная</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to= "/login">Войти</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to= "/register">Регистрация</router-link></li>
                    <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Выйти</button></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'navbar',
        data() {
            return {
                isLoggedIn: false,
                currentUser: false,
            }
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
            }
        },
        methods: {
            logout: function() {
                firebase.auth().signOut().then(() => {
                    this.$router.go({path: this.$router.path});
                });
            }
        }
    }

</script>

<style scoped>
.email {
    padding-right: 10px;
}
</style>
