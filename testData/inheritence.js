var Parent=sp.Class.create("Parent",{methods:{method:function method(){}},properties:{prop:null}});var Child=sp.Class.create("Child",Parent,{methods:{cc:function cc(){var self=this;self.pp=self.method();self.prop=self.cc()}},properties:{pp:null}})
