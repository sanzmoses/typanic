import { defineStore } from 'pinia'

export const useSkillsStore = defineStore('SkillsStore', {
    state: () => ({
      skills: [
        {
            name: 'HTML',
            logo: 'html',
            exp: '24',
            skillLevel: 80,
            color: '#F0652A',
            tags: ['general']
        },
        {
            name: 'CSS',
            logo: 'css',
            exp: '24',
            skillLevel: 90,
            color: '#3BADF3', 
            tags: ['general', 'frontend']
        },
        {
            name: 'PHP',
            logo: 'php',
            exp: '24',
            skillLevel: 80,
            color: '#4D588E',
            tags: ['general', 'backend']
        },
        {
            name: 'Javascript',
            logo: 'javascript',
            exp: '24',
            skillLevel: 78,
            color: '#F3CF01', 
            tags: ['general', 'frontend']
        },
        {
            name: 'Laravel',
            logo: 'code',
            exp: '12',
            skillLevel: 75,
            color: '#F33C21',
            tags: ['backend', 'framework']
        },
        {
            name: 'OctoberCMS',
            logo: 'language',
            exp: '10',
            skillLevel: 65,
            color: '#D76925', 
            tags: ['cms', 'framework']
        },
        {
            name: 'Wordpress',
            logo: 'wordpress',
            exp: '10',
            skillLevel: 50,
            color: '#207196', 
            tags: ['cms', 'framework']
        },
        {
            name: 'VueJs',
            logo: 'javascript',
            exp: '12',
            skillLevel: 65,
            color: '#3FB27F', 
            tags: ['frontend', 'framework']
        },
        {
            name: 'AngularJs',
            logo: 'javascript',
            exp: '12',
            skillLevel: 30,
            color: '#D6002F', 
            tags: ['frontend', 'library']
        },
        {
            name: 'Bootstrap',
            logo: 'css',
            exp: '12',
            skillLevel: 85,
            color: '#7C47D5', 
            tags: ['frontend', 'library']
        },
        {
            name: 'MySQL',
            logo: 'insert_chart_outlined',
            exp: '12',
            skillLevel: 65,
            color: '#00618B', 
            tags: ['general', 'backend', 'database']
        },
        {
            name: 'Git',
            logo: 'save',
            exp: '12',
            skillLevel: 65,
            color: '#E84E31', 
            tags: ['tools', 'version control']
        },
        {
            name: 'Gitlab CI',
            logo: 'document_scanner',
            exp: '12',
            skillLevel: 65,
            color: '#F49E25', 
            tags: ['tools', 'version control']
        },
        {
            name: 'SCSS',
            logo: 'css',
            exp: '12',
            skillLevel: 65,
            color: '#C96095', 
            tags: ['tools', 'css']
        },
        {
            name: 'LESS',
            logo: 'css',
            exp: '12',
            skillLevel: 80,
            color: '#2A4C7C', 
            tags: ['tools', 'css']
        },
        {
            name: 'React Native',
            logo: 'javascript',
            exp: '12',
            skillLevel: 70,
            color: '#61DAFB', 
            tags: ['tools', 'framework', 'mobile']
        },
        {
            name: 'UIkit',
            logo: 'library_books',
            exp: '12',
            skillLevel: 80,
            color: '#61DAFB', 
            tags: ['frontend', 'library']
        }
    ],
    }),
    actions: {
      SET_SKILL(data) {
        this.skills.push(data)
      },
    },
})