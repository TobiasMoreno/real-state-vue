<template>
    <div class="table-wrapper">
        <table class="generic-table">
            <thead class="generic-table__head">
                <tr class="generic-table__row">
                    <th v-for="col in columns" :key="col.key" class="generic-table__cell generic-table__cell--head">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody class="generic-table__body">
                <tr v-for="row in data" :key="row[idKey] || rowIndex(row)" class="generic-table__row">
                    <td v-for="col in columns" :key="col.key" class="generic-table__cell">
                        <img v-if="isImageUrl(row[col.key])" :src="row[col.key]" :alt="col.label"
                            class="generic-table__img" />

                        <span v-else-if="col.key === 'price'">
                            {{ formatCurrency(row[col.key]) }}
                        </span>

                        <span v-else-if="col.key === 'status'" :class="{
                            'generic-table__cell--span-paid': row[col.key] === 'Paid',
                            'generic-table__cell--span-unpaid': row[col.key] === 'Unpaid'
                        }">
                            {{ row[col.key] }}
                        </span>

                        <span v-else>
                            {{ row[col.key] }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">

type TableColumn = { key: string; label: string }

const props = defineProps<{
    columns: TableColumn[],
    data: Record<string, any>[],
    idKey?: string
}>()

const idKey = props.idKey || 'id'

const isImageUrl = (value: any): boolean =>
    typeof value === 'string' && /\.(jpe?g|png|gif|svg)$/i.test(value)

const formatCurrency = (value: number) => {
    if (typeof value !== 'number') return value
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(value)
}

const rowIndex = (row: any) => JSON.stringify(row)
</script>
<style lang="scss" scoped src="./table.scss" />