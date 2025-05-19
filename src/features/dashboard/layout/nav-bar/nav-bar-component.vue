<template>
    <header class="dashboard-header">
        <div class="dashboard-header__left">
            <div class="dashboard-header__left-menu-container">
                <div class="dashboard-header__logo">
                    <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747406016/logo-dark_wo13qh.png" alt="logo" />
                </div>
                <div class="dashboard-header__menu">
                    <div class="dashboard-header__menu-icon" @click="toggle">
                        <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747406080/bx-menu_xalvvw.svg" alt="menu" />
                    </div>
                </div>
                <div class="dashboard-header__search">
                    <div class="dashboard-header__search-icon">
                        <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747406114/magnify_tulqaa.svg" alt="search" />
                    </div>
                    <input type="text" placeholder="Search..." class="dashboard-header__search-input" />
                </div>
            </div>
        </div>
        <div class="dashboard-header__right">
            <a class="dashboard-header__right-icon">
                <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747406133/notifications_jf0nf6.svg" alt="notifications" />
            </a>
            <a class="dashboard-header__right-icon">
                <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747406138/usa_gvok7i.png" alt="usa" />
            </a>
            <a class="dashboard-header__right-icon">
                <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747406139/user_kkwwtc.jpg" alt="user" class="dashboard-header__right-user" />
            </a>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useSidebarService } from '@/composables/use-side-bar'
const { toggle } = useSidebarService()
</script>

<style lang="scss" scoped>
@use './nav-bar.scss';
</style>