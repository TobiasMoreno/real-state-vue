<template>
    <NavBar />
    <Sidebar />
    <div class="layout__content" :class="{ 'layout__content--shifted': open }">
        <h5 class="layout__content__title">Hello, Calvin</h5>
        <h6 class="layout__content__subtitle">Welcome back!</h6>
        <div class="layout__content__cards">
            <CardComponent v-for="card in cards" :key="card.title" :title="card.title" :value="card.value"
                :actionIcon="card.actionIcon" :actionAlt="card.actionAlt" />
        </div>

        <section class="layout__content__chart-revenue-sales-data">
            <RevenueAnalytics class="layout__content__chart-revenue-sales-data__revenue-analytics" />
            <SalesData class="layout__content__chart-revenue-sales-data__sales-data" />
        </section>
        <div class="layout__content__recent-transactions-top-properties">
            <Map class="layout__content__recent-transactions-top-properties__map" />
            <RecentTransaction class="layout__content__recent-transactions-top-properties__recent-transaction" />
            <TopProperties class="layout__content__recent-transactions-top-properties__top-properties" />
        </div>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import NavBar from '../layout/nav-bar/nav-bar-component.vue'
import Footer from '../layout/footer/footer-component.vue'
import Sidebar from '../layout/nav-bar/side-bar/side-bar-component.vue'
import { useSidebarService } from '../../../composables/use-side-bar'
import CardComponent from '../card/card-component.vue'
import RevenueAnalytics from '../revenue-analytics/revenue-analytics-component.vue'
import SalesData from '../sales-data/sales-data.vue'
import Map from '../area-map/AreaMap.vue'
import RecentTransaction from '../recent-transactions/recent-transaction.vue'
import TopProperties from '../top-properties/top-properties.vue'

const { open } = useSidebarService()

const cards = [
    {
        title: 'Total Revenue',
        value: 45890,
        actionIcon: 'https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747405857/currency-usd_kh3mjx.svg',
        actionAlt: 'dollar',
    },
    {
        title: 'Total Visitor',
        value: '2456',
        actionIcon: 'https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747405892/account-group-outline-black_hffe4o.svg',
        actionAlt: 'users',
    },
    {
        title: 'Total Properties',
        value: '358',
        actionIcon: 'https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747405909/home-city-outline-black_sv5urd.svg',
        actionAlt: 'home',
    },
    {
        title: 'Properties for Sell',
        value: '243',
        actionIcon: 'https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747405930/home-lightning-bolt-outline_haeix5.svg',
        actionAlt: 'sale',
    },
    {
        title: 'Properties for Rent',
        value: '115',
        actionIcon: 'https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747405947/home-clock-outline_ngvk8s.svg',
        actionAlt: 'sale',
    },
];
</script>

<style lang="scss" scoped>
@use './layout.scss';
</style>
