import { defineStore } from "pinia";
import { api } from "@/plugins/axios";
import { Building } from "@/features/buildings/type/building";

export const useBuildingStore = defineStore("building", {
  state: () => ({
    buildings: [] as Building[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async filterBuildings(filters: {
      sale?: boolean;
      keyword?: string;
      typeName?: string;
      ambientes?: string;
      priceRange?: string;
    }) {
      this.isLoading = true;
      this.error = null;
      try {
        const { data } = await api.post<Building[]>(
          "/buildings/filter",
          filters
        );
        this.buildings = data;
      } catch (err) {
        this.error = "Error filtering buildings";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
