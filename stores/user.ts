export const useUserStore = defineStore('user', {
    state: () => ({
        username: 'Guest'
    }),
    actions: {
        login(name: string) {
            this.username = name
        }
    }
})