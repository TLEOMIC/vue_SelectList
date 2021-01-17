//格式化隔离用，以下代码不能去注释
//1.3.2021.1.17
class SelectList{
    static InitTemplate(type){
        switch(type){
            case 'select-list':
                return `
                    <div @click="fun('stop')" :class="[{css_SelectList:true},fun('changeclass','peripheral')]" :style="fun('ThisWidth')">
                        <div @click="fun('input')" class="css_SelectList_input" :style="fun('ThisHeight')">
                            <template v-if="/(^1$)|(^3$)/.test(this.$root.SelectList.Config[group]['type'])">
                                <ul>
                                    <li v-for="(val,key) in this.$root.SelectList.Choise[group]">
                                        <div>{{val}}</div>
                                        <span @click="fun('click',[key,val])">X</span>
                                    </li>
                                </ul>
                            </template>
                            <template v-else-if="/(^2$)|(^4$)/.test(this.$root.SelectList.Config[group]['type'])">
                                <div class="one" v-for="(val,key) in this.$root.SelectList.Choise[group]">{{val}}</div>
                            </template>
                            <template v-else>
                                <div class="one">error:Config->["group"]->type 定义错误</div>
                            </template>
                            <div class="css_cleanAll" @click="fun('clean_all')" v-show="show">
                                X
                            </div>
                        </div>
                        <div v-show="show&&(JSON.stringify(this.$root.SelectList.Data[group]) !='{}'|| this.$root.SelectList.Config[group]['command']==true)" class="css_SelectList_ul">
                            <ul>
                                <li class="command">
                                    <div v-if="this.$root.SelectList.Config[group]['commandVisual'] === true" class="commandVisualButton" @click="fun('ChangeCommandDefaultType')">
                                        {{ this.fun('CommandObj',this.$root.SelectList.Config[group]['commandDefaultType'] !== undefined?this.$root.SelectList.Config[group]['commandDefaultType']:'select') }}
                                    </div>
                                    <input :class="[{commandVisual:this.$root.SelectList.Config[group]['commandVisual'] === true}]" type="text" :placeholder="fun('commandMsg')" v-model="command" @keyup="fun('command',['change'])" @keyup.enter="fun('command',['keyup'])">
                                    
                                    <div class="multi_choice_state" v-if="/(^1$)|(^3$)/.test(this.$root.SelectList.Config[group]['type'])" @click.stop="fun('multi_choice_state_click',fun('for'))">
                                        <svg v-if="fun('multi_choice_state',fun('for')) == 0" t="1600929001436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12179" width="15" height="15"><path d="M512 1024C229.6 1024 0 794.4 0 512S229.6 0 512 0s512 229.6 512 512S794.4 1024 512 1024zM512 96c-229.6 0-416 186.4-416 416 0 229.6 186.4 416 416 416s416-186.4 416-416C928 282.4 741.6 96 512 96z" p-id="12180"></path></svg>
                                        <svg v-else-if="fun('multi_choice_state',fun('for')) == 1" t="1600928889442" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4850" width="15" height="15"><path d="M512 1024C229.6 1024 0 794.4 0 512 0 229.6 229.6 0 512 0s512 229.6 512 512C1024 794.4 794.4 1024 512 1024zM512 48l0 464 0 464c256 0 464-208 464-464C976 256 768 48 512 48z" p-id="4851"></path></svg>
                                        <svg v-else-if="fun('multi_choice_state',fun('for')) == 2" t="1600929011353" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12312" width="15" height="15"><path d="M512 512m-512 0a100 100 0 1 0 1024 0 100 100 0 1 0-1024 0Z" p-id="12313"></path></svg>
                                    </div>
                                </li>
                                <template v-if="!ChangeCommandDefaultType">
                                    <template v-if="/(^1$)|(^2$)/.test(this.$root.SelectList.Config[group]['type'])">
                                        <li v-for="(val,key) in fun('for')" @click="fun('click',[key,val])" :class="fun('class',key)">{{val}}<div :class="fun('classicon',key)">√</div></li>
                                    </template>
                                    <template v-if="/(^3$)|(^4$)/.test(this.$root.SelectList.Config[group]['type'])">
                                        <template v-for="(val,key) in fun('for')">
                                          <offspring :offspring="val" :fatherkey="''" :fathergroup="group" :dataKey="vm.$root.SelectList.Config[group]['key']" :dataval="vm.$root.SelectList.Config[group]['val']" :dataoffspring="vm.$root.SelectList.Config[group]['offspring']"></offspring>
                                        </template>
                                    </template>
                                </template>
                                <template v-else>
                                    <li v-for="(val,key) in fun('CommandObj')" @click="fun('ChangeCommandDefaultType',key)" :class="fun('CommandDefaultTypeClass',key)">{{val}}<div :class="fun('classicon',key)">√</div></li>
                                </template>
                                
                            </ul>
                        </div>
                    </div>
                `;
            case 'offspring':
                return `
                    <li @click.stop="fun('focus',[fatherkey+offspring[dataKey],true,(offspring[dataoffspring] != undefined)?true:offspring])" :class="fun('class',[offspring[dataKey],offspring[dataoffspring] == undefined])">
                        {{offspring[dataval]}}
                        <div v-if="offspring[dataoffspring] == undefined" :class="fun('classicon',[offspring[dataKey],offspring[dataoffspring] == undefined])">√</div>
                        <template v-else>
                            <template v-if="fun('show',fatherkey+offspring[dataKey])" >▼</template>
                            <template v-else >▲</template>
                            <div class="multi_choice_state" v-if="this.$root.SelectList.Config[this.fathergroup]['type'] == 3" @click.stop="fun('multi_choice_state_click',offspring[dataoffspring])">
                                <svg v-if="fun('multi_choice_state',offspring[dataoffspring]) == 0" t="1600929001436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12179" width="15" height="15"><path d="M512 1024C229.6 1024 0 794.4 0 512S229.6 0 512 0s512 229.6 512 512S794.4 1024 512 1024zM512 96c-229.6 0-416 186.4-416 416 0 229.6 186.4 416 416 416s416-186.4 416-416C928 282.4 741.6 96 512 96z" p-id="12180"></path></svg>
                                <svg v-else-if="fun('multi_choice_state',offspring[dataoffspring]) == 1" t="1600928889442" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4850" width="15" height="15"><path d="M512 1024C229.6 1024 0 794.4 0 512 0 229.6 229.6 0 512 0s512 229.6 512 512C1024 794.4 794.4 1024 512 1024zM512 48l0 464 0 464c256 0 464-208 464-464C976 256 768 48 512 48z" p-id="4851"></path></svg>
                                <svg v-else-if="fun('multi_choice_state',offspring[dataoffspring]) == 2" t="1600929011353" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12312" width="15" height="15"><path d="M512 512m-512 0a100 100 0 1 0 1024 0 100 100 0 1 0-1024 0Z" p-id="12313"></path></svg>
                            </div>
                        </template>
                        <template v-if="offspring[dataoffspring] != undefined && fun('show',fatherkey+offspring[dataKey])">
                            <template v-for="(val,key) in offspring[dataoffspring]">
                                <offspring :fathergroup="fathergroup" :offspring="val":fatherkey="fatherkey+offspring[dataKey]+'|'" :dataKey="dataKey" :dataval="dataval" :dataoffspring="dataoffspring"></offspring>
                            </template>
                        </template>
                    </li>
                `;
        }
    }
    static multi_choice_state(vm,objs,group) {
        let LOCAL_is_all=true;
        let LOCAL_is_null=true;
        if(vm.$root.SelectList.Config[group]['type'] == 3){
            var CLOSURE_fun = function(objs){
                for (var LOCAL_key in objs) {
                    if(objs[LOCAL_key][vm.$root.SelectList.Config[group]['offspring']] == undefined){
                        if(vm.$root.SelectList['Choise'][group][objs[LOCAL_key][vm.$root.SelectList.Config[group]['key']]] == undefined){
                            LOCAL_is_all = false;
                        }else{
                            LOCAL_is_null = false;
                        }
                    }else{
                        CLOSURE_fun(objs[LOCAL_key][vm.$root.SelectList.Config[group]['offspring']]);
                    }
                    if(!LOCAL_is_all&&!LOCAL_is_null){
                        break;
                    }
                }
            }
            CLOSURE_fun(objs);
        }else if(vm.$root.SelectList.Config[group]['type'] == 1){
            for(var LOCAL_key in objs){
                if(vm.$root.SelectList['Choise'][group][LOCAL_key] == undefined){
                    LOCAL_is_all = false;
                }else{
                    LOCAL_is_null = false;
                }
                if(!LOCAL_is_all&&!LOCAL_is_null){
                    break;
                }
            }
        }
        if(LOCAL_is_null){
            return 0;
        }
        if(LOCAL_is_all){
            return 2;
        }
        return 1;
    }
    static multi_choice_state_click(vm,objs,group,RootKey){
        let LOCAL_type = vm.fun('multi_choice_state',objs);
        //如果已是最大值，则转为删除模式
        if(vm.$root.SelectList.Config[group]['max'] != undefined &&  objlength(vm.$root.SelectList.Choise[group]) == vm.$root.SelectList.Config[group]['max']){
            LOCAL_type = 3;
        }
        switch(LOCAL_type){
            case 0:
            case 1:
                if(vm.$root.SelectList.Config[group]['type'] == 3){
                    var CLOSURE_fun = function(objs){
                        for (var LOCAL_key in objs) {
                            if(objs[LOCAL_key][vm.$root.SelectList.Config[group]['offspring']] == undefined){
                                if(vm.$root.SelectList['Choise'][group][objs[LOCAL_key][RootKey]] == undefined){
                                    //最大值
                                    if(vm.$root.SelectList.Config[group]['max'] != undefined && objlength(vm.$root.SelectList.Choise[group]) >= vm.$root.SelectList.Config[group]['max']){
                                        if(vm.$root.SelectList.Config[group]['maxTips'] === true){
                                            alert((vm.$root.SelectList.Config[group]['maxTipsMsg'] != undefined)?vm.$root.SelectList.Config[group]['maxTipsMsg']:"最多选择"+vm.$root.SelectList.Config[group]['max']+"个")
                                        }
                                        return true;
                                    }
                                    Vue.set(vm.$root.SelectList['Choise'][group],objs[LOCAL_key][RootKey],objs[LOCAL_key][vm.$root.SelectList.Config[group]['val']])
                                }
                            }else{
                                if(CLOSURE_fun(objs[LOCAL_key][vm.$root.SelectList.Config[group]['offspring']])){
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                    CLOSURE_fun(objs);
                }else if(vm.$root.SelectList.Config[group]['type'] == 1){
                    for (var LOCAL_key in objs) {
                        if(vm.$root.SelectList['Choise'][group][LOCAL_key] == undefined){
                            if(vm.$root.SelectList.Config[group]['max'] != undefined && objlength(vm.$root.SelectList.Choise[group]) >= vm.$root.SelectList.Config[group]['max']){
                                if(vm.$root.SelectList.Config[group]['maxTips'] === true){
                                    alert((vm.$root.SelectList.Config[group]['maxTipsMsg'] != undefined)?vm.$root.SelectList.Config[group]['maxTipsMsg']:"最多选择"+vm.$root.SelectList.Config[group]['max']+"个")+"个"
                                }
                                break;
                            }
                            Vue.set(vm.$root.SelectList['Choise'][group],LOCAL_key,objs[LOCAL_key]);
                        }
                    }
                }
            break;
            case 2:
            //3是强制删除
            case 3:
                if(vm.$root.SelectList.Config[group]['type'] == 3){
                    var CLOSURE_fun = function(objs){
                        for(let LOCAL_key in objs){
                            if(objs[LOCAL_key][vm.$root.SelectList.Config[group]['offspring']] == undefined){
                                if(vm.$root.SelectList['Choise'][group][objs[LOCAL_key][RootKey]] != undefined){
                                    Vue.delete(vm.$root.SelectList['Choise'][group],objs[LOCAL_key][RootKey])
                                }
                            }else{
                                CLOSURE_fun(objs[LOCAL_key][vm.$root.SelectList.Config[group]['offspring']]);
                            }
                        }
                    }
                    CLOSURE_fun(objs);
                }else if(vm.$root.SelectList.Config[group]['type'] == 1){
                    for (var LOCAL_key in objs) {
                        if(vm.$root.SelectList['Choise'][group][LOCAL_key] != undefined){
                             Vue.delete(vm.$root.SelectList['Choise'][group],LOCAL_key);
                        }
                       
                    }
                }
            break;
        }
    }
    static click(vm,objs,group){
        switch(vm.$root.SelectList.Config[group]['type']){
            case '1':
            case '3':
                if(vm.$root.SelectList.Choise[group][objs[0]] == undefined){
                    //检查是否大于最大限定数量
                    if(vm.$root.SelectList.Config[group]['max'] != undefined && objlength(vm.$root.SelectList.Choise[group]) >= vm.$root.SelectList.Config[group]['max']){
                        if(vm.$root.SelectList.Config[group]['maxTips'] === true){
                            alert((vm.$root.SelectList.Config[group]['maxTipsMsg'] != undefined)?vm.$root.SelectList.Config[group]['maxTipsMsg']:"最多选择"+vm.$root.SelectList.Config[group]['max']+"个")
                        }
                        break;
                    }
                    Vue.set(vm.$root.SelectList.Choise[group],objs[0],objs[1]);
                }else{
                    Vue.delete(vm.$root.SelectList.Choise[group],objs[0]);
                }
            break;
            case '2':
                vm.$root.SelectList.Choise[group] = {};
                Vue.set(vm.$root.SelectList.Choise[group],objs[0],objs[1]);
            break;
            case '4':
                vm.$root.SelectList.Choise[vm.fathergroup] = {};
                Vue.set(vm.$root.SelectList.Choise[vm.fathergroup],objs[0],objs[1]);
            break;
        }
    }
}
Vue.component('select-list',{
    props:["group"],
    template:SelectList.InitTemplate('select-list'),
    data:function () {
        return {
          show:false,
          stop:false,
          placeholder:'',
          command:"",
          vm:null,
          ChangeCommandDefaultType:false,
        }
      },
    methods:{
        fun(type,objs){
            switch(type){
                //清空
                case 'clean_all':
                    this.$root.SelectList.Choise[this.group] = {};
                    break;
                case 'commandMsg':
                    //空
                    if(this.$root.SelectList.Config[this.group]['commandMsg'] == undefined){
                        return '正则匹配';
                    }
                    //字符串
                    if(typeof(this.$root.SelectList.Config[this.group]['commandMsg']) == "string"){
                        return this.$root.SelectList.Config[this.group]['commandMsg'];
                    }
                    //对象
                    if(typeof(this.$root.SelectList.Config[this.group]['commandMsg']) == "object"){
                        //对象存在
                        if(this.$root.SelectList.Config[this.group]['commandMsg'][this.$root.SelectList.Config[this.group]['commandDefaultType']] !=undefined){
                            return this.$root.SelectList.Config[this.group]['commandMsg'][this.$root.SelectList.Config[this.group]['commandDefaultType']];
                        }
                        //对象默认存在
                        if(this.$root.SelectList.Config[this.group]['commandMsg']['Default']!=undefined){
                            return this.$root.SelectList.Config[this.group]['commandMsg']['Default'];
                        }
                        //什么都不存
                        return '';
                    }
                break;
                //class调整
                case 'CommandDefaultTypeClass':
                    if(this.$root.SelectList.Config[this.group]['commandDefaultType'] == objs){
                        return ["clicked","css_SelectList_ul_hover"];
                    }
                    return ["css_SelectList_ul_hover"];
                break;
                //改变模式
                case 'ChangeCommandDefaultType':
                    if(objs == undefined || objs == null){
                        this.ChangeCommandDefaultType = !this.ChangeCommandDefaultType;
                        return;
                    }
                    Vue.set(this.$root.SelectList.Config[this.group],'commandDefaultType',objs);
                    this.ChangeCommandDefaultType = false;
                break;
                //实际CommandObj数组
                case 'CommandObj':
                    //默认
                    let DefaultCommandObj = {
                        select:"查询",
                        push:"插入"
                    };
                    if(this.$root.SelectList.Config[this.group]['commandDefaultTypeAllow'] != undefined){
                        for(let LOCAL_key in this.$root.SelectList.Config[this.group]['commandDefaultTypeAllow']){
                            if(this.$root.SelectList.Config[this.group]['commandDefaultTypeAllow'][LOCAL_key] === false && DefaultCommandObj[LOCAL_key] != undefined){
                                delete DefaultCommandObj[LOCAL_key];
                            }else{
                                DefaultCommandObj[LOCAL_key] = this.$root.SelectList.Config[this.group]['commandDefaultTypeAllow'][LOCAL_key];
                            }
                        }
                    }
                    //输入为空
                    if(objs == undefined || objs == null){
                            return DefaultCommandObj;
                    }
                    //对象不存在该配置 返回原数据
                    if(DefaultCommandObj[objs] == undefined){
                        return objs;
                    }
                    return DefaultCommandObj[objs];
                break;
                case 'command':
                    let command = thiscommand = LOCAL_command = KeyValuePair = obj = LOCAL_key = LOCLA_ThisKey = LOCAL_KeyValuePair = LOCAL_end = LOCAL_eval = LOCAL_eval_is_runed = undefined;
                    thiscommand=(objs[1] == undefined || objs[1] == null)?this.command:objs[1];
                    command = /^(.+?) (.*)/.exec(thiscommand);
                    if(command == null){
                        this.fun('command',[objs[0],((this.$root.SelectList.Config[this.group]['commandDefaultType'] != null ||this.$root.SelectList.Config[this.group]['commandDefaultType'] != undefined)?this.$root.SelectList.Config[this.group]['commandDefaultType']:"select")+' '+thiscommand]);
                        return false;
                    }
                    switch(command[1]){
                        case 'push':
                        case 'updata':
                        case 'insert':
                        case 'delete':
                        case 'changemode':
                            this.placeholder = '';
                            if(objs[0] !== 'keyup'){
                                return false;
                            }
                            if(this.$root.SelectList.Config[this.group]['command'] !== true){
                                console.log('command未开启命令无法使用');
                                return false;
                            }
                            if(this.$root.SelectList.Config[this.group]['commandAllow'] != undefined &&this.$root.SelectList.Config[this.group]['commandAllow'] != "*" && this.$root.SelectList.Config[this.group]['commandAllow'][command[1]] !== true && this.$root.SelectList.Config[this.group]['commandDefaultType'] !== command[1]){
                                console.log('"'+command[1]+'"命令无法使用');
                                return false;
                            }
                        break;
                        case 'select':
                            if(objs[0] !== 'change'){
                                return false;
                            }
                        break;
                        default:
                           this.fun('command',[objs[0],((this.$root.SelectList.Config[this.group]['commandDefaultType'] != null ||this.$root.SelectList.Config[this.group]['commandDefaultType'] != undefined)?this.$root.SelectList.Config[this.group]['commandDefaultType']:"select")+' '+thiscommand]);
                        return false;
                    }
                   
                    switch(command[1]){
                        case 'push':
                            LOCAL_command = command[2].split(' ');
                            let LOCAL_push_KeyValuePair = LOCAL_command[0].split(',');
                            LOCAL_command.splice(0,1);
                            for(var LOCAL_push_key in LOCAL_push_KeyValuePair){
                                if(this.fun(
                                    'command',['keyup','insert key='+LOCAL_push_KeyValuePair[LOCAL_push_key]+",val="+LOCAL_push_KeyValuePair[LOCAL_push_key]+((LOCAL_command.length>0)?' '+LOCAL_command.join(" "):'')]
                                    )===false
                                ){
                                    break;
                                }
                            }
                        break;
                        //仅支持一次插入/修改一个
                        case 'updata':
                        case 'insert':
                            LOCAL_command = command[2].split(' ');
                            KeyValuePair = LOCAL_command[0].split(',');
                            obj = {};
                            for (LOCAL_key in KeyValuePair) {
                                LOCAL_KeyValuePair = /^(.+?)=(.+)/.exec(KeyValuePair[LOCAL_key]);
                                if(this.$root.SelectList.Config[this.group][LOCAL_KeyValuePair[1]] != undefined){
                                    if( LOCAL_KeyValuePair[1] == 'val' ){
                                        LOCLA_ThisKey = LOCAL_KeyValuePair[2];
                                    }
                                    obj[this.$root.SelectList.Config[this.group][LOCAL_KeyValuePair[1]]] = LOCAL_KeyValuePair[2];
                                }
                            }
                            //删除第一个
                            LOCAL_command.splice(0,1);
                            LOCAL_eval = "this.$root.SelectList.Data[this.group]";
                            for (LOCAL_key in LOCAL_command) {
                                //这里是因为for出来的是字符串
                                LOCAL_key = parseInt(LOCAL_key);
                                if(LOCAL_key%2 == 0){
                                    switch(LOCAL_command[LOCAL_key]){
                                        case 'where':
                                            if(LOCAL_command[LOCAL_key+1] != undefined){
                                                LOCAL_eval_is_runed = this.$root.SelectList.Config[this.group]['offspring'];
                                                LOCAL_eval += '["'+(LOCAL_command[LOCAL_key+1].split(',')).join('"]["'+this.$root.SelectList.Config[this.group]['offspring']+'"]["')+'"]';
                                            }else{
                                                alert('"'+LOCAL_command[LOCAL_key]+'"命令缺少参数');
                                                return false;
                                            }
                                        break;
                                        default:
                                        alert('"'+LOCAL_command[LOCAL_key]+'"不是命令或未定义');
                                        return false;
                                    }
                                }
                            }
                            //检查是否为空
                            if(LOCAL_eval_is_runed != undefined){
                                if(eval(LOCAL_eval+"['"+LOCAL_eval_is_runed+"']") == undefined ){
                                    Vue.set(eval(LOCAL_eval),LOCAL_eval_is_runed,{});
                                }
                                LOCAL_eval += "['"+LOCAL_eval_is_runed+"']";
                            }
                            //设置值
                            switch(command[1]){
                                case 'insert':
                                    if(eval(LOCAL_eval+'["'+LOCLA_ThisKey+'"]') == undefined){
                                        Vue.set(eval(LOCAL_eval),LOCLA_ThisKey,obj);
                                    }else{
                                        console.log('insert失败，已存在主键');
                                    }
                                    break;
                                case 'updata':
                                    if(eval(LOCAL_eval+'["'+LOCLA_ThisKey+'"]') != undefined){
                                        Vue.set(eval(LOCAL_eval),LOCLA_ThisKey,obj);
                                    }else{
                                        console.log('updata失败，不存在主键');
                                    }
                                    break;
                            }
                        break;
                        case 'delete':
                            switch (command[2]) {
                                case '[ALLCHOISE]':
                                    Vue.set(this.$root.SelectList.Choise,this.group,{});
                                    break;
                                case '[ALL]':
                                    Vue.set(this.$root.SelectList.Data,this.group,{});
                                    break;
                                default:
                                    LOCAL_eval = "this.$root.SelectList.Data[this.group]";
                                    LOCAL_command = command[2].split(',');
                                    LOCLA_ThisKey = LOCAL_command[LOCAL_command.length - 1];
                                    LOCAL_command.splice(LOCAL_command.length - 1, 1);
                                    if (LOCAL_command.length > 0) {
                                        LOCAL_eval += '["' + (LOCAL_command).join('"]["' + this.$root.SelectList.Config[this.group]['offspring'] + '"]["') + '"]["' + this.$root.SelectList.Config[this.group]['offspring'] + '"]'
                                    }
                                    try {
                                        Vue.delete(eval(LOCAL_eval), LOCLA_ThisKey)
                                    } catch (e) {}
                            }
                        break;
                        case 'changemode':
                            switch(command[2]){
                                case '3':
                                case '4':
                                    this.$root.SelectList.Config[this.group]['type'] = command[2];
                                break;
                                default:
                                console.log('"'+command[2]+'"越界');
                                return false;
                            }
                        break;
                        case 'select':
                            this.placeholder = command[2];
                        break;
                        default:
                            console.log('"'+command[1]+'"不是命令或未定义');
                            return false;
                    }
                     if (objs == undefined || objs == null || (this.$root.SelectList.Config[this.group]['PerformCleanup'] && objs[0] === 'keyup')) {
                        this.command = ''
                    }
                break;
                //svg判断方法
                case 'multi_choice_state':
                    return SelectList.multi_choice_state(this,objs,this.group);
                break;
                //svg点击事件
                case 'multi_choice_state_click':
                    SelectList.multi_choice_state_click(this,objs,this.group,this.$root.SelectList.Config[this.group]['key']);
                break;
                //选择
                case 'click':
                    SelectList.click(this,objs,this.group);
                break;
                //当前窗体显示
                case 'input':
                    this.show = true;
                break;
                //维持当前窗体显示(多窗体切换时用到)
                case 'stop':
                    this.stop = true;
                break;
                //class调整
                case 'class':
                    if(this.$root.SelectList.Choise[this.group][objs] != undefined){
                        return ["clicked","css_SelectList_ul_hover"];
                    }
                    return ["css_SelectList_ul_hover"];
                break;
                //√的class调整
                case 'classicon':
                    if(this.$root.SelectList.Choise[this.group][objs] != undefined){
                        return ["clicked","iconPublic"];
                    }
                    return ["iconPublic"];
                break;
                //整体宽度
                case 'ThisWidth':
                    if(this.$root.SelectList.Config[this.group]['width'] == undefined){
                        return {width:"433px"};
                    }
                    if(/%/.test(this.$root.SelectList.Config[this.group]['width'])){
                        return {width:this.$root.SelectList.Config[this.group]['width']}
                    }
                    return {width:this.$root.SelectList.Config[this.group]['width']+"px"}
                break;
                //整体长度
                case 'ThisHeight':
                    var arr = {};
                    if (this.$root.SelectList.Config[this.group]['minHeight'] == undefined && this.$root.SelectList.Config[this.group]['minHeight'] == undefined) {
                        return {}
                    }
                    if (/%/.test(this.$root.SelectList.Config[this.group]['minHeight'])) {
                        arr['minHeight'] = this.$root.SelectList.Config[this.group]['minHeight'];
                    }else if (this.$root.SelectList.Config[this.group]['minHeight'] != undefined) {
                        arr['minHeight'] = this.$root.SelectList.Config[this.group]['minHeight'] + "px";
                    }
                    if (/%/.test(this.$root.SelectList.Config[this.group]['maxHeight'])) {
                        arr['maxHeight'] = this.$root.SelectList.Config[this.group]['maxHeight'];
                    }else if (this.$root.SelectList.Config[this.group]['maxHeight'] != undefined) {
                        arr['maxHeight'] = this.$root.SelectList.Config[this.group]['maxHeight'] + "px";
                    }
                    return arr;
                    break;
                //数据循环
                case 'for':
                    if(this.placeholder == ''){
                        return this.$root.SelectList.Data[this.group];
                    }
                    if(/(^1$)|(^2$)/.test(this.$root.SelectList.Config[this.group]['type'])){
                        LOCAL_arr = {};
                        for(var LOCAL_key in this.$root.SelectList.Data[this.group]){
                            try {
                                //正则可能会出错
                                if(new RegExp(this.placeholder).test(this.$root.SelectList.Data[this.group][LOCAL_key])){
                                    LOCAL_arr[LOCAL_key] = this.$root.SelectList.Data[this.group][LOCAL_key];
                                }
                            } catch (e) {
                                LOCAL_arr[LOCAL_key] = this.$root.SelectList.Data[this.group][LOCAL_key];
                            }
                        }
                        return LOCAL_arr;
                    }
                    if(/(^3$)|(^4$)/.test(this.$root.SelectList.Config[this.group]['type'])){
                        try {
                            //正则可能会出错
                            new RegExp(this.placeholder).test('Regular check');
                        } catch (e) {
                            console.log(this.placeholder+"Regular check");
                            return this.$root.SelectList.Data[this.group];
                        }
                        //闭包
                        var recursion = function(arr,offspring,val,placeholder){
                            let keys = Object.keys(JSON.parse(JSON.stringify(arr)));
                            for(let LOCAL_key = keys.length-1;LOCAL_key >-1 ; LOCAL_key --){
                                //是否存在子类
                                if(arr[keys[LOCAL_key]][offspring] != undefined){
                                    //存在则遍历
                                    recursion(arr[keys[LOCAL_key]][offspring],offspring,val,placeholder);
                                    //对象/数组的长度是否等于0
                                    if(arr[keys[LOCAL_key]][offspring].length == 0 || objlength(arr[keys[LOCAL_key]][offspring]) == 0){
                                        //查看是数组还是对象
                                        if(keys[LOCAL_key] == LOCAL_key){
                                            arr.splice(keys[LOCAL_key],1);
                                        }else{
                                            delete arr[keys[LOCAL_key]];
                                        }
                                    }
                                }else{
                                    if(!new RegExp(placeholder).test(arr[keys[LOCAL_key]][(arr[keys[LOCAL_key]][val[0]] != undefined)?val[0]:val[1]])){
                                        if(keys[LOCAL_key] == LOCAL_key){
                                            arr.splice(keys[LOCAL_key],1);
                                        }else{
                                            delete arr[keys[LOCAL_key]];
                                        }
                                    }
                                }
                            }
                            return arr;
                        }
                        // JSON.parse + JSON.stringify 为真正的复制
                        return recursion(JSON.parse(JSON.stringify(this.$root.SelectList.Data[this.group])),this.$root.SelectList.Config[this.group]['offspring'],[this.$root.SelectList.Config[this.group]['Regexval'],this.$root.SelectList.Config[this.group]['val']],this.placeholder);
                    }
                break;
                //额外加上新的class
                case 'changeclass':
                    if(this.$root.SelectList.Config[this.group]['class'] === undefined){
                        return [];
                    }
                    return (this.$root.SelectList.Config[this.group]['class'][objs] !== undefined)?this.$root.SelectList.Config[this.group]['class'][objs]:"";
                break;
            }
        }
    },
    created(){
        var vm = this.vm =this;
        if(!this.$root.SelectList.Config[this.group]['prohibit']){
            Vue.set(this.$root.SelectList.Config[this.group], 'prohibit', false);
        }
        document.addEventListener('click', function(){
            if(vm.stop){
                vm.stop = false;
                return;
            }
            vm.show = false;
        });
        //初始化
        if(/(^3$)|(^4$)/.test(this.$root.SelectList.Config[this.group]['type'])){
            Vue.set(this.$root.SelectList.Config[this.group],'focus',null);
        }
    }
});
Vue.component('offspring',{
    props:["offspring","dataKey","dataval","dataoffspring","fatherkey","fathergroup"],
    template:SelectList.InitTemplate('offspring'),
    methods:{
        fun(type,objs =null){
            switch(type){
                //焦点
                //有子数据时展示子数据,无子数据时跳转click
                case 'focus':
                    //有子数据
                    if(objs[2] == true){
                        var VOCAL_arr = [];
                        var VOCAL_val = objs[0];
                        //拆分当前字符串转成正则匹配形式存入数组
                        while(true){
                            VOCAL_arr.push("(^"+VOCAL_val.split('|').join('\\\|')+"$)");
                            if(!/\|/.test(VOCAL_val)){
                                break;
                            }
                            VOCAL_val = /.+(?=\|)/.exec(VOCAL_val)[0];
                        }
                        if(this.$root.SelectList.Config[this.fathergroup]['focus'] != null && objs[1]){
                            //检查是否是相似
                            let LOCAL_statue = this.$root.SelectList.Config[this.fathergroup]['focus'].indexOf(VOCAL_arr.join("|"));
                            //相似 为0以上
                            if(LOCAL_statue >= 0){
                                //检查是否为二级或以上
                                if(/.+(?=\|)/.exec(objs[0])){
                                    //二级以上退步写入(因为当前是已打开的状态，要退回上一级)
                                    this.fun(type, [/.+(?=\|)/.exec(objs[0])[0],false,objs[2]]);
                                    return;
                                }else{
                                    //一级变null
                                    Vue.set(this.$root.SelectList.Config[this.fathergroup],'focus',null);
                                    return;
                                }

                            }
                            //不相似直接替换
                            else{
                                Vue.set(this.$root.SelectList.Config[this.fathergroup],'focus',VOCAL_arr.join("|"));
                                return;
                            }
                        }
                        //退步/null(第一次或其他情况)的都是进这里
                        else{
                            
                            Vue.set(this.$root.SelectList.Config[this.fathergroup],'focus',VOCAL_arr.join("|"));
                            return;
                        }
                    }
                    //无子类跳转点击
                    else{
                        this.fun('click',[objs[2][this.$root.SelectList.Config[this.fathergroup]['key']],objs[2][this.$root.SelectList.Config[this.fathergroup]['val']]]);
                    }
                break;
                //展示
                case 'show':
                    if(new RegExp(this.$root.SelectList.Config[this.fathergroup]['focus']).test(objs)){
                        return true;
                    }
                    return false;
                break;
                //class调整
                case 'class':
                    if(objs[1]){
                        if(this.$root.SelectList.Choise[this.fathergroup][objs[0]] != undefined){
                            return ["clicked","css_SelectList_ul_hover"];
                        }else{
                            return ["css_SelectList_ul_hover"];
                        }
                    }
                    return ["css_SelectList_ul_group_hover"];
                break;
                //√的class调整
                case 'classicon':
                    if(this.$root.SelectList.Choise[this.fathergroup][objs[0]] != undefined){
                        return ["clicked","iconPublic","offspring"];
                    }else{
                        return ["iconPublic","offspring"];
                    }
                break;
                //点击
                case 'click':
                    SelectList.click(this,objs,this.fathergroup);
                break;
                //svg判断方法
                case 'multi_choice_state':
                    return SelectList.multi_choice_state(this,objs,this.fathergroup);
                break;
                //svg点击事件
                case 'multi_choice_state_click':
                    SelectList.multi_choice_state_click(this,objs,this.fathergroup,this.dataKey);
                break
            }
        }
    }
});
//获取obj类型数据的长度
function objlength(obj){
    if(typeof(obj) == "object"){
        return Object.keys(JSON.parse(JSON.stringify(obj))).length;
    }
    return -1;
};
