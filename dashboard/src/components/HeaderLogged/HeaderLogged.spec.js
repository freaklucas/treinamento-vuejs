import { shallowMount } from '@vue/test-utils'
import HeaderLogged from '.'
import { routes  } from '../../router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

const mockStore = { currentUser: {} }

jest.mock('../../hooks/useStore', ()=> {
    return () => {
        return mockStore
    }
})

describe('<HeaderLogged />', ()=> {
    it('should render header logged correctly',async ()=> {
        router.push('/')
        await router.isReady()
        mockStore.currentUser.name = 'Lucas'
        const wrapper = shallowMount(HeaderLogged, {
            global: {
                plugins: [ router ]
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
    it.skip('should render 3 dots when theres not user logged', async ()=> {
        router.push('/')
        await router.isReady()
        const wrapper = shallowMount(HeaderLogged, {
            global: {
                plugins: [ router ]
            }
        })
        const buttonLogout = wrapper.find('#logout-button')
        expect(buttonLogout.text()).toBe('...')
    })
    it.skip('should render user when theres user logged', async ()=> {
        router.push('/')
        await router.isReady()
        const wrapper = shallowMount(HeaderLogged, {
            global: {
                plugins: [ router ]
            }
        })
        const buttonLogout = wrapper.find('#logout-button')
        expect(buttonLogout.text()).toBe('Lucas (sair)')
    })
})