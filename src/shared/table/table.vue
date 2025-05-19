<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="col in columns" :key="col.key">
                    {{ col.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data" :key="row[idKey]">
                <td v-for="col in columns" :key="col.key">
                    <img v-if="isImageColumn(col.key)" :src="row[col.key]" class="table__img" alt="" />
                    <span v-else>
                        {{ row[col.key] }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
type Column = { key: string; label: string }

const props = defineProps<{
    columns: Column[],
    data: Record<string, any>[],
    idKey?: string
}>()

const idKey = props.idKey || 'id'

const isImageColumn = (key: string) =>
    key.toLowerCase().includes('image') || key.toLowerCase().includes('avatar')
</script>

<style scoped lang="scss">
.table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 12px 8px;
        text-align: left;
        border-bottom: 1px solid var(--color-border);
    }

    .table__img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 4px;
    }
}
</style>