Vue.component('select-list',{
    props:["group"],
    template:`
        <div @click="fun('stop')" :class="[{css_SelectList:true},fun('changeclass','peripheral')]" :style="fun('ThisWidth')">
            <div @click="fun('input')" class="css_SelectList_input">
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
            </div>
            <div v-show="show&&JSON.stringify(this.$root.SelectList.Data[group]) !='{}'" class="css_SelectList_ul">
                <ul>
                    <li class="preg_match">
                        <input type="text" :placeholder="this.$root.SelectList.Config[group]['placeholder'] != undefined?this.$root.SelectList.Config[group]['placeholder']:'正则匹配'" v-model="Vmodel">
                        <div class="multi_choice_state" v-if="/(^1$)|(^3$)/.test(this.$root.SelectList.Config[group]['type'])" @click.stop="fun('multi_choice_state_click',fun('for'))">
                            <svg style="padding-top: 5px;" v-if="fun('multi_choice_state',fun('for')) == 0" t="1600929001436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12179" width="15" height="15"><path d="M512 1024C229.6 1024 0 794.4 0 512S229.6 0 512 0s512 229.6 512 512S794.4 1024 512 1024zM512 96c-229.6 0-416 186.4-416 416 0 229.6 186.4 416 416 416s416-186.4 416-416C928 282.4 741.6 96 512 96z" p-id="12180"></path></svg>
                            <svg style="padding-top: 5px;" v-else-if="fun('multi_choice_state',fun('for')) == 1" t="1600928889442" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4850" width="15" height="15"><path d="M512 1024C229.6 1024 0 794.4 0 512 0 229.6 229.6 0 512 0s512 229.6 512 512C1024 794.4 794.4 1024 512 1024zM512 48l0 464 0 464c256 0 464-208 464-464C976 256 768 48 512 48z" p-id="4851"></path></svg>
                            <svg style="padding-top: 5px;" v-else-if="fun('multi_choice_state',fun('for')) == 2" t="1600929011353" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12312" width="15" height="15"><path d="M512 512m-512 0a100 100 0 1 0 1024 0 100 100 0 1 0-1024 0Z" p-id="12313"></path></svg>
                        </div>
                    </li>
                    <template v-if="/(^1$)|(^2$)/.test(this.$root.SelectList.Config[group]['type'])">
                        <li v-for="(val,key) in fun('for')" @click="fun('click',[key,val])" :class="fun('class',key)">{{val}}<div :class="fun('classicon',key)">√</div></li>
                    </template>
                    <template v-if="/(^3$)|(^4$)/.test(this.$root.SelectList.Config[group]['type'])">
                        <template v-for="(val,key) in fun('for')">
                          <offspring :offspring="val" :fatherkey="''" :fathergroup="group" :dataKey="vm.$root.SelectList.Config[group]['key']" :dataval="vm.$root.SelectList.Config[group]['val']" :dataoffspring="vm.$root.SelectList.Config[group]['offspring']"></offspring>
                        </template>
                    </template>
                </ul>
            </div>
        </div>
    `,
    data:function () {
        return {
          show:false,
          stop:false,
          Vmodel:'',
          vm:null
        }
      },
    methods:{
        fun(type,objs){
            switch(type){
                case 'multi_choice_state':
                    let LOCAL_is_all=true;
                    let LOCAL_is_null=true;
                    var vm = this;
                    if(this.$root.SelectList.Config[vm.group]['type'] == 3){
                        var CLOSURE_fun = function(objs){
                            for (var LOCAL_key in objs) {
                                if(objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['offspring']] == undefined){
                                    if(vm.$root.SelectList['Choise'][vm.group][objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['key']]] == undefined){
                                        LOCAL_is_all = false;
                                    }else{
                                        LOCAL_is_null = false;
                                    }
                                }else{
                                    CLOSURE_fun(objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['offspring']]);
                                }
                                if(!LOCAL_is_all&&!LOCAL_is_null){
                                    break;
                                }
                            }
                        }
                        CLOSURE_fun(objs);
                    }else if(this.$root.SelectList.Config[vm.group]['type'] == 1){
                        for(var LOCAL_key in objs){
                            if(vm.$root.SelectList['Choise'][vm.group][LOCAL_key] == undefined){
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
                break;
                case 'multi_choice_state_click':
                    let LOCAL_type = this.fun('multi_choice_state',objs);
                    switch(LOCAL_type){
                        case 0:
                        case 1:
                            var vm =this;
                            if(this.$root.SelectList.Config[vm.group]['type'] == 3){
                                var CLOSURE_fun = function(objs){
                                    for (var LOCAL_key in objs) {
                                        if(objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['offspring']] == undefined){
                                            if(vm.$root.SelectList['Choise'][vm.group][objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['key']]] == undefined){
                                                Vue.set(vm.$root.SelectList['Choise'][vm.group],objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['key']],objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['val']])
                                            }
                                        }else{
                                            CLOSURE_fun(objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['offspring']]);
                                        }
                                    }
                                }
                                CLOSURE_fun(objs);
                            }else if(this.$root.SelectList.Config[vm.group]['type'] == 1){
                                for (var LOCAL_key in objs) {
                                    if(vm.$root.SelectList['Choise'][vm.group][LOCAL_key] == undefined){
                                        Vue.set(vm.$root.SelectList['Choise'][vm.group],LOCAL_key,objs[LOCAL_key]);
                                    }
                                }
                            }
                        break;
                        case 2:
                            var vm =this;
                            if(this.$root.SelectList.Config[vm.group]['type'] == 3){
                                var CLOSURE_fun = function(objs){
                                    for(let LOCAL_key in objs){
                                        if(objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['offspring']] == undefined){
                                            if(vm.$root.SelectList['Choise'][vm.group][objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['key']]] != undefined){
                                                Vue.delete(vm.$root.SelectList['Choise'][vm.group],objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['key']])
                                            }
                                        }else{
                                            CLOSURE_fun(objs[LOCAL_key][vm.$root.SelectList.Config[vm.group]['offspring']]);
                                        }
                                    }
                                }
                                CLOSURE_fun(objs);
                            }else if(this.$root.SelectList.Config[vm.group]['type'] == 1){
                                for (var LOCAL_key in objs) {
                                    if(vm.$root.SelectList['Choise'][vm.group][LOCAL_key] != undefined){
                                         Vue.delete(vm.$root.SelectList['Choise'][vm.group],LOCAL_key);
                                    }
                                   
                                }
                            }
                        break;
                    }
                break;
                case 'input':
                    this.show = true;
                break;
                case 'stop':
                    this.stop = true;
                break;
                case 'click':
                    switch(this.$root.SelectList.Config[this.group]['type']){
                        case '1':
                        case '3':
                            if(this.$root.SelectList.Choise[this.group][objs[0]] == undefined){
                                Vue.set(this.$root.SelectList.Choise[this.group],objs[0],objs[1]);
                            }else{
                                Vue.delete(this.$root.SelectList.Choise[this.group],objs[0]);
                            }
                        break;
                        case '2':
                            this.$root.SelectList.Choise[this.group] = {};
                            Vue.set(this.$root.SelectList.Choise[this.group],objs[0],objs[1]);
                        break;
                    }
                break;
                case 'class':
                    if(this.$root.SelectList.Choise[this.group][objs] != undefined){
                        return ["clicked","css_SelectList_ul_hover"];
                    }
                    return ["css_SelectList_ul_hover"];
                break;
                case 'classicon':
                    if(this.$root.SelectList.Choise[this.group][objs] != undefined){
                        return ["clicked","iconPublic"];
                    }
                    return ["iconPublic"];
                break;

                case 'ThisWidth':
                    if(this.$root.SelectList.Config[this.group]['width'] == undefined){
                        return {width:"433px"};
                    }
                    if(/%/.test(this.$root.SelectList.Config[this.group]['width'])){
                        return {width:this.$root.SelectList.Config[this.group]['width']}
                    }
                    return {width:this.$root.SelectList.Config[this.group]['width']+"px"}
                break;
                case 'for':
                    if(this.Vmodel == ''){
                        return this.$root.SelectList.Data[this.group];
                    }
                    if(/(^1$)|(^2$)/.test(this.$root.SelectList.Config[this.group]['type'])){
                        
                        LOCAL_arr = {};
                        for(var LOCAL_key in this.$root.SelectList.Data[this.group]){
                            try {
                                //正则可能会出错
                                if(new RegExp(this.Vmodel).test(this.$root.SelectList.Data[this.group][LOCAL_key])){
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
                            new RegExp(this.Vmodel).test('Regular check');
                        } catch (e) {
                            console.log(this.Vmodel+"Regular check");
                            return this.$root.SelectList.Data[this.group];
                        }
                        var recursion = function(arr,offspring,val,Vmodel){
                            let keys = Object.keys(JSON.parse(JSON.stringify(arr)));
                            for(let LOCAL_key = keys.length-1;LOCAL_key >-1 ; LOCAL_key --){
                                if(arr[keys[LOCAL_key]][offspring] != undefined){
                                    recursion(arr[keys[LOCAL_key]][offspring],offspring,val,Vmodel);
                                    if(arr[keys[LOCAL_key]][offspring].length == 0){
                                        if(keys[LOCAL_key] == LOCAL_key){
                                            arr.splice(keys[LOCAL_key],1);
                                        }else{
                                            delete arr[keys[LOCAL_key]];
                                        }
                                    }
                                }else{
                                    if(!new RegExp(Vmodel).test(arr[keys[LOCAL_key]][(arr[keys[LOCAL_key]][val[0]] != undefined)?val[0]:val[1]])){
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
                        return recursion(JSON.parse(JSON.stringify(this.$root.SelectList.Data[this.group])),this.$root.SelectList.Config[this.group]['offspring'],[this.$root.SelectList.Config[this.group]['Regexval'],this.$root.SelectList.Config[this.group]['val']],this.Vmodel);
                    }
                break;
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
    template:`
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
    `,
    methods:{
        fun(type,objs =null){
            switch(type){
                case 'focus':
                    //无子类
                    if(objs[2] == true){
                        var VOCAL_arr = [];
                        var VOCAL_val = objs[0];
                        while(true){
                            VOCAL_arr.push("(^"+VOCAL_val.split('|').join('\|')+"$)");
                            if(!/\|/.test(VOCAL_val)){
                                break;
                            }
                            VOCAL_val = /.+(?=\|)/.exec(VOCAL_val)[0];
                        }
                        if(this.$root.SelectList.Config[this.fathergroup]['focus'] != null && objs[1]){
                            let LOCAL_statue = this.$root.SelectList.Config[this.fathergroup]['focus'].indexOf(VOCAL_arr.join("|"));
                            if(LOCAL_statue >= 0){
                                if(/.+(?=\|)/.exec(objs[0])){
                                    this.fun(type, [/.+(?=\|)/.exec(objs[0])[0],false,objs[2]]);
                                    return;
                                }else{
                                     Vue.set(this.$root.SelectList.Config[this.fathergroup],'focus',null);
                                    return;
                                }
                            }else{
                                Vue.set(this.$root.SelectList.Config[this.fathergroup],'focus',VOCAL_arr.join("|"));
                                return;
                            }
                        }else{
                            Vue.set(this.$root.SelectList.Config[this.fathergroup],'focus',VOCAL_arr.join("|"));
                            return;
                        }
                    }else{
                        this.fun('click',[objs[2][this.$root.SelectList.Config[this.fathergroup]['key']],objs[2][this.$root.SelectList.Config[this.fathergroup]['val']]]);
                    }
                break;
                case 'show':
                    if(new RegExp(this.$root.SelectList.Config[this.fathergroup]['focus']).test(objs)){
                        return true;
                    }
                    return false;
                break;
                case 'click':
                    switch(this.$root.SelectList.Config[this.fathergroup]['type']){
                         case '3':
                            if(this.$root.SelectList.Choise[this.fathergroup][objs[0]] == undefined){
                                Vue.set(this.$root.SelectList.Choise[this.fathergroup],objs[0],objs[1]);
                            }else{
                                Vue.delete(this.$root.SelectList.Choise[this.fathergroup],objs[0]);
                            }
                        break;
                        case '4':
                            this.$root.SelectList.Choise[this.fathergroup] = {};
                            Vue.set(this.$root.SelectList.Choise[this.fathergroup],objs[0],objs[1]);
                        break;
                    }
                break;
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
                case 'classicon':
                    if(this.$root.SelectList.Choise[this.fathergroup][objs[0]] != undefined){
                        return ["clicked","iconPublic","offspring"];
                    }else{
                        return ["iconPublic","offspring"];
                    }
                break;
                case 'multi_choice_state':
                    let LOCAL_is_all=true;
                    let LOCAL_is_null=true;
                    var vm = this;
                    var CLOSURE_fun = function(objs){
                        for (var LOCAL_key in objs) {
                            if(objs[LOCAL_key][vm.dataoffspring] == undefined){
                                if(vm.$root.SelectList['Choise'][vm.fathergroup][objs[LOCAL_key][vm.dataKey]] == undefined){
                                    LOCAL_is_all = false;
                                }else{
                                    LOCAL_is_null = false;
                                }
                            }else{
                                CLOSURE_fun(objs[LOCAL_key][vm.dataoffspring]);
                            }
                            if(!LOCAL_is_all&&!LOCAL_is_null){
                                break;
                            }
                        }
                    }
                    CLOSURE_fun(objs);
                    if(LOCAL_is_null){
                        return 0;
                    }
                    if(LOCAL_is_all){
                        return 2;
                    }
                    return 1;
                break;
                case 'multi_choice_state_click':
                    let LOCAL_type = this.fun('multi_choice_state',objs);
                    switch(LOCAL_type){
                        case 0:
                        case 1:
                            var vm =this;
                            var CLOSURE_fun = function(objs){
                                for (var LOCAL_key in objs) {
                                    if(objs[LOCAL_key][vm.dataoffspring] == undefined){
                                        if(vm.$root.SelectList['Choise'][vm.fathergroup][objs[LOCAL_key][vm.dataKey]] == undefined){
                                            Vue.set(vm.$root.SelectList['Choise'][vm.fathergroup],objs[LOCAL_key][vm.dataKey],objs[LOCAL_key][vm.dataval])
                                        }
                                    }else{
                                        CLOSURE_fun(objs[LOCAL_key][vm.dataoffspring]);
                                    }
                                }
                            }
                            CLOSURE_fun(objs);
                        break;
                        case 2:
                            var vm =this;
                            var CLOSURE_fun = function(objs){
                                for(let LOCAL_key in objs){
                                    if(objs[LOCAL_key][vm.dataoffspring] == undefined){
                                        if(vm.$root.SelectList['Choise'][vm.fathergroup][objs[LOCAL_key][vm.dataKey]] != undefined){
                                            Vue.delete(vm.$root.SelectList['Choise'][vm.fathergroup],objs[LOCAL_key][vm.dataKey])
                                        }
                                    }else{
                                        CLOSURE_fun(objs[LOCAL_key][vm.dataoffspring]);
                                    }
                                }
                            }
                            CLOSURE_fun(objs);
                        break;

                    }
                break
            }
        }
    }
});