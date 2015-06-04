'use strict';

module.exports = {
	app: {
		title: '工作流管理',
		description: 'Work Flow',
		keywords: ''
	},
	port: process.env.PORT || 9201,
	roles: {
		all: '*',
		user: 'user',
		admin: 'admin',
		super: 'super'
	},
	employeeLvl: {
		specialist: 'specialist',
		manager: 'manager'
	},
	employeeMapper: {
		specialist: '专员',
		manager: '经理'
	},
	vacationType:{
		annual: 'annual',
		sick: 'sick',
		leave: 'leave'
	},
	vacationMapper: {
		annual: '年假',
		sick: '病假',
		leave: '事假'	
	},
	approvalStatus:{
		wait: 0,
		approved: 1,
		rejected: -1
	},
	approvalStatusMapper:{
		'0': '待审批',
		'1': '审批通过',
		'-1': '拒绝'
	},
	advice: {
		category: {
			'1': '提交BUG',
			'2': '界面风格',
			'3': '内容建议',
			'4': '提问',
			'5': '留言',
			'99': '其他'
		},
		status: {
			'1': 'New',
			'2': '待处理',
			'3': '已处理',
			'4': '已回复',
			'5': '关闭'
		}
	},
	templateEngine: 'jade',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	baiduMapKey: 'fxEBGc46DmIt6oK2yjk4GC57p'
};