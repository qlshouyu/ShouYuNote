import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import EditNote from '@/pages/note/NoteEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {path: '/', redirect: '/home'},
        {
          path: '/home',
          component: Home,
          children: [
            {path: '/home/note', component: EditNote}
          ]
        },
        {path: '/login', component: Login}
      ]
    }
  ]
})
