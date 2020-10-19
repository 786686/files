<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				数组类型
				<text>\nnodes属性为Array</text>
			</view>
			<view class="uni-common-mt" style="background:#FFF; padding:20upx;">
				<rich-text :nodes="nodes"></rich-text>
			</view>
			<view class="uni-title uni-common-mt">
				字符串类型
				<text>\nnodes属性为String</text>
			</view>
			<view class="uni-common-mt" style="background:#FFF; padding:20upx;">
				<rich-text :nodes="strings"></rich-text>
			</view>
			<image src="../../../static/play.png" mode=""></image>
			
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'rich-text',
				nodes: [{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: 'line-height: 60px; color: red; text-align:center;'
					},
					children: [{
						type: 'text',
						text: 'Hello&nbsp;uni-app!'
					}]
				}],
				strings:"<img  src='../../../static/play.png'>	<p>阿里云的三任总裁在云栖大会罕见地同台了。这三个人分别是“初代目”王坚、“二代目”胡晓明和“三代目”张建锋。</p><p>2009 年，王坚承担着非常大的压力成立了阿里云，成为了阿里云的第一任总裁。同年，花名“孙权”的胡晓明在阿里内部创业，成为了阿里金融的总裁。2014 年底，金融出身的胡晓明从心理学出身的王坚手中接过阿里云，阿里云从博士到了职业经理人手中，迎来了一波商业化的跳跃。胡晓明接手后的 4 年，阿里云的年度营收从 10.96 亿元涨到了 213.6 亿元，翻了 20 倍以上。</p><p>直到去年年底，阿里云再一次换帅，花名“行癫”的 CTO 张建锋接替胡晓明成为阿里云智能事业群总裁，阿里云又从职业经理人回到了技术派手中。</p><p>9 月 25 日，现任<span >阿里技术委员会主席王坚、现任</span><span >蚂蚁金服集团总裁胡晓明和现任阿里云总裁张建锋在云栖大会上再一次同框，话锋中能看出三人迥异的学术背景、思维方式和谈吐风格。</span></p><p><strong>以下为现场对话实录，经36氪编辑整理：</strong></p><p><strong>主持人：请王坚博士开一个场，您对今天的数字化经济时代有什么<span >见解？</span></strong></p><p><span >王坚：现在讲对“数字经济”有什么真知</span><span >灼见显得早了一点，就像十年以前谈云计算那样，其实没有</span><span >说清楚什么东西。数字经济，我理解就是两点：</span><span >一，不应该是“数字经济”，应该是“经济数字”。数字经济的本质是经济数字。</span><span >二，一年半之前我从来不提“数字经济”这个词。现在开始提的原因是我</span><span >们国家在“数字经济”前面加了一个定语——“以数据为关键要素的数字经</span><span >济”。有了这个定语以后，我们今天谈的数字经济就和欧洲的数字经济有了一道分水岭。</span></p><p>这个定语正好和当年我们做云计算的思路吻合了，10 年以前，我们也在云计算前面加了一个定语，<span >叫做“以数据为中心的云计算”。历史就是这么慢慢吻合起来的。</span><span >如果一定要讲的话，以数据为中心的云计算为今天以数据为关键要素的数字经济搭了</span><span >一个桥，开了一条更远的路。</span></p><p><strong><span >主持人：</span><span >大家都在说数字经济要来了，它对于个体的影响有哪些？请三位挑</span><span >最感兴趣的分享。</span></strong></p><p>张建锋：我们知道在消费领域肯定发生了非常多的变化，比如电子商务<span >。我加入阿里巴巴是在 04 年，到今年 15 年，基本上见证了整个</span><span >零售业从移动互联网到今天的变革过程。最早是移动互联网技术和零售产业</span><span >的结合，今天的电子商务已经远远超越了这个概念。它涉及和供应链以及消费者的互动，并与</span><span >蚂蚁金服的借呗、花呗消费信贷完全融合在一起。</span></p><p><span >今天整个阿里有 50% 以上的交易都是信用支付，这些都是</span><span >基于数字技术完成的。</span><span >今天你</span><span >在浙江省办港澳通行证，是不用去现场的。你要成为一个网约车的司机，以前要提</span><span >供 10 份以上的材料，今年只提供 1 份材料就可以了，而且是网上交材料，2 天之内就能办</span><span >结，以前要超过 15 天。</span><span >很多人不觉得我在数字化，但确实是在享受数字化带来的</span><span >价值。</span></p><p><strong><span >主持人：王坚博士</span><span >是云计算在中国最初的推动者，当时要把未来看不到的愿景和大家讲，现在逐一都实现了。</span><span >哪些变化是让您特别欣慰的？</span></strong></p><p>王坚：其实我觉得变化永远都很好。从大会角<span >度来看，最早开云栖大会的时候，来的都是网站站长，那是云计算最早的先驱。我觉得好的转变就</span><span >是他们不见了。他们不见了就是时代发展了。我相信今天很多来开会的人，再过 5 年也不见了。</span><span >那是因为时代发展了。</span></p><p><span ></span><strong>主持人：在区块链金融中，阿里怎么推进？</strong><span ></span><br/></p><p>胡晓明：<span >区块链的技术不仅仅在于发虚拟币，区块链技术在比特币上用了这么短时间，创造了全世界前</span><span >十大货币，价值 1700 亿美金，这是非常了不起的。</span><span >我认为前半场互联</span><span >网都是消费互联网，面对于数字时代、企业互联网到来，区块链在建立企业共识和信任方面</span><span >将发挥巨大的作用。</span></p><p>今天我们在供应链金融体系当中有很多与区块链有关的创新，除此之外<span >在交易凭证、电子发票中也都在持续投入资源。</span><span >我们坚信一条，区块链技术对于未来 3、5 年商业经济的影响、数字经济的影响是非常重</span><span >大的。</span></p><p><strong><span >主持人：“</span><span >城市大脑”概念是在这个舞台上提出的，大家都希望改变居</span><span >住的社区、城市，乃至更大的行政区域。杭州的城市大脑推广得</span><span >到底怎么样，遇到了什么困难，取得了什么有效的进展？</span></strong></p><p><span >王坚：用三句话来回答这个问题。第一句话，大家还没搞明白这个概念就开始叫了，这是一个好事情，至少证明大家对美好生活有向往。第二句话，</span><span >城市大脑如果撇开所有的</span><span >功能而言，就是要解决一个城市的数据流动性问题。今天如果城市数据不流动，它是不会</span><span >让这个城市真正看到解决办法的。第三句话，</span><span >杭州至少已经做到了真正地在一个城市规模上谈</span><span >这件事情，也是第一次让我看到希望，我们是在讲城市的大脑，而不是在讲一个城市的某一种</span><span >功能。</span></p><p><span >大家在很多场合听到人工智能技术，实际上听到的还是“一个技术”、或者“</span><span >一种功能”，它们远远谈不上从一个城市整体的角度考虑问题。杭</span><span >州是非常积极的，因为它在一个城市的水平上想这个事情。</span></p><p><span ></span></p><p><strong>主持人：三位是阿里云不同时代的掌门人，<span >请留一句话给给阿里云。</span></strong></p><p>王坚：继续努力，没有什么东西可以替代努力！</p><p>胡晓明：技术已经越来越成为一种共识。</p><p>张建锋：需求牵引、技术驱动。</p><p><span ></span>（题图来自阿里）</p>"
				// strings: '<div style="text-align:center;"><h1>adsfadsf</h1><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
			}
		}
	}
</script>
