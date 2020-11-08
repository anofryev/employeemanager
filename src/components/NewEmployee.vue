<template>
    <div id= 'new-employee'>
        <h3>Новый заказ</h3>
        <div class="row">
            <form @submit.prevent="saveEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="employee_id" required>
                        <label>ID заказа</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Наименование</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                        <label>Количество</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                        <label>Адрес доставки</label>
                    </div>
                </div>
                <button type="submit" class="btn">Добавить</button>
                <router-link to="/" class="btn grey">Отмена</router-link>
            </form>
        </div>
    </div> 
 </template>

<script>
    import db from './firebaseInit'
    export default {
        name: 'new-employee',
        data () {
            return {
                employee_id: null,
                name: null,
                dept: null,
                position: null
            }
        },
        methods: { 
            saveEmployee () {
                db.collection('employees').add({
                    employee_id: this.employee_id,
                    name: this.name,
                    dept: this.dept,
                    position: this.position
                })
                .then(docRef => this.$router.push('/'))
                .catch(error => console.log(err))
            }
        }
    }
</script>