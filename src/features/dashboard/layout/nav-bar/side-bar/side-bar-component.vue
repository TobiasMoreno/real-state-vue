<template>
    <div class="sidebar" :class="{ 'sidebar--closed': !open }">
        <nav class="sidebar__nav">
            <ul class="sidebar__list">
                <li v-for="item in menuItems" :key="item.id" class="sidebar__item">
                    <RouterLink :to="item.path" class="sidebar__link" active-class="sidebar__link--selected"
                        @click="onMenuClick">
                        <i :class="['sidebar__link__icon', item.icon]"></i>
                        <span class="sidebar__link__text">{{ item.name }}</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>

        <div class="sidebar__upgrade">
            <div class="sidebar__upgrade__content">
                <h4 class="sidebar__upgrade__title">Upgrade to Pro</h4>
                <p class="sidebar__upgrade__desc">
                    Get one month free and subscribe to pro
                </p>
                <button class="sidebar__upgrade__btn">Subscribe</button>
            </div>
            <i class="sidebar__upgrade__bg-icon mdi mdi-home-city-outline"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useSidebarService } from '../../../../../composables/use-side-bar'

import type { MenuItem } from './models/menu-item'
import { RouterLink } from 'vue-router'
const menuItems = ref<MenuItem[]>([])

const { open, close } = useSidebarService()

function onMenuClick() {
    close()
}

onMounted(async () => {
    const { data } = await axios.get<MenuItem[]>('/menu-items.json')
    menuItems.value = data
})


</script>

<style lang="scss" scoped>
@use './side-bar.scss';
</style>