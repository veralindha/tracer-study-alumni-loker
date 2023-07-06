import create from "zustand"

const useLoginStore = create((set) => ({
  isLoggedIn: 0,
  userId: '',
  role: '',
  user: '',
  email: '',
  setLogin: () => set((state) => ({isLoggedIn: state.isLoggedIn + 1})),
  setUserId: (userId) => set((state) => ({role: userId})),
  setRole: (role) => set((state) => ({role: role})),
  setUser: (username) => set((state) => ({user: username})),
  setEmail: (email) => set((state) => ({email: email})),
  setLogout: () => set((state) => ({isLoggedIn: 0, userId: '', role: '', user: '', email: ''})),
}))

export default useLoginStore