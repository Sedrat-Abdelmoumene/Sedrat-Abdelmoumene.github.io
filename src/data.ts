import projectImage from './assets/projects/restaurant-ordering.png'

export const site = {
  name: 'Sedrat Abdelmoumene', preferredName: 'Moumene', arabicName: 'سدرات عبد المؤمن', role: 'Web Developer',
  email: 'abdelmoumenesedrat@gmail.com', whatsapp: 'https://wa.me/213794868404', github: 'https://github.com/Sedrat-Abdelmoumene',
  projectUrl: 'https://github.com/Sedrat-Abdelmoumene/qr-orders-system',
  projectImage,
}

export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent('Project inquiry')}&body=${encodeURIComponent(`Hello Moumene,\n\nI’d like to talk about a project or opportunity.\n\n[Write your message here]\n\nBest regards,\n[Your name]`)}`

export const skillGroups = [
  { title: 'Development', note: 'Interfaces, web experiences, and useful products.', skills: [
    ['Web Development', '</>'], ['UI/UX', '✦'], ['Python', 'Py'], ['JavaScript', 'JS'], ['React', '⚛'], ['HTML/CSS', '<>'], ['Git/GitHub', 'Git'],
  ] },
  { title: 'Vibe Coding', note: 'Fast experimentation, AI-assisted building, and practical ideas.', skills: [
    ['AI Tools', 'AI'], ['Problem Solving', '↗'],
  ] },
  { title: 'Game Development', note: 'Interactive systems and game-making tools.', skills: [
    ['C#', 'C#'], ['Unity', '◈'], ['Godot', 'GD'],
  ] },
] as const
