'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">intelligent-bms documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-be8e8849301094f038d550e24d05a7a3d5dbb18e098fd849276465ec412b653d3d3ba5bace47e3de12236e0d7803b28999b14ffed531a116cf82de20910f01a4"' : 'data-target="#xs-components-links-module-AppModule-be8e8849301094f038d550e24d05a7a3d5dbb18e098fd849276465ec412b653d3d3ba5bace47e3de12236e0d7803b28999b14ffed531a116cf82de20910f01a4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-be8e8849301094f038d550e24d05a7a3d5dbb18e098fd849276465ec412b653d3d3ba5bace47e3de12236e0d7803b28999b14ffed531a116cf82de20910f01a4"' :
                                            'id="xs-components-links-module-AppModule-be8e8849301094f038d550e24d05a7a3d5dbb18e098fd849276465ec412b653d3d3ba5bace47e3de12236e0d7803b28999b14ffed531a116cf82de20910f01a4"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeviceDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeviceDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DevicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DevicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DevicesDefaultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DevicesDefaultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FootNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FootNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeadNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeadNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BatteryPacksModule.html" data-type="entity-link" >BatteryPacksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BatteryPacksModule-ceb3caefa805b57203aa9333d748d0392452e233896270be9d2d3f123052d6450292bb325f81dba5baab559b7d66381e48fa830d14bacd7bc37111812ef144da"' : 'data-target="#xs-components-links-module-BatteryPacksModule-ceb3caefa805b57203aa9333d748d0392452e233896270be9d2d3f123052d6450292bb325f81dba5baab559b7d66381e48fa830d14bacd7bc37111812ef144da"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BatteryPacksModule-ceb3caefa805b57203aa9333d748d0392452e233896270be9d2d3f123052d6450292bb325f81dba5baab559b7d66381e48fa830d14bacd7bc37111812ef144da"' :
                                            'id="xs-components-links-module-BatteryPacksModule-ceb3caefa805b57203aa9333d748d0392452e233896270be9d2d3f123052d6450292bb325f81dba5baab559b7d66381e48fa830d14bacd7bc37111812ef144da"' }>
                                            <li class="link">
                                                <a href="components/AddBatteryPackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddBatteryPackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BatteryPacksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BatteryPacksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBatteryPackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditBatteryPackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewBatteryPacksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewBatteryPacksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BatteryPacksRoutingModule.html" data-type="entity-link" >BatteryPacksRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BatteryTestModule.html" data-type="entity-link" >BatteryTestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BatteryTestModule-708c0e279f65b615e54a8b78f6a214e02f60064b5f2921b35adb8be590ed0f594979a2482744a8202e94a5a657f11abc099f8bfdeba1f7e75d439d2374d7dc0c"' : 'data-target="#xs-components-links-module-BatteryTestModule-708c0e279f65b615e54a8b78f6a214e02f60064b5f2921b35adb8be590ed0f594979a2482744a8202e94a5a657f11abc099f8bfdeba1f7e75d439d2374d7dc0c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BatteryTestModule-708c0e279f65b615e54a8b78f6a214e02f60064b5f2921b35adb8be590ed0f594979a2482744a8202e94a5a657f11abc099f8bfdeba1f7e75d439d2374d7dc0c"' :
                                            'id="xs-components-links-module-BatteryTestModule-708c0e279f65b615e54a8b78f6a214e02f60064b5f2921b35adb8be590ed0f594979a2482744a8202e94a5a657f11abc099f8bfdeba1f7e75d439d2374d7dc0c"' }>
                                            <li class="link">
                                                <a href="components/BatteryTestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BatteryTestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateNewTestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateNewTestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoResultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowAllTestsResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowAllTestsResultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowTestResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowTestResultComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BatteryTestRoutingModule.html" data-type="entity-link" >BatteryTestRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CellsModule.html" data-type="entity-link" >CellsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CellsModule-acc90ded32f6dbc47e739ae2a36692c91c34781dcf5e229fe248c095d77e04ed3254d6870dd47299d2a8501c59c46ee283842b7aae8c51ae81a3f357e62a9f25"' : 'data-target="#xs-components-links-module-CellsModule-acc90ded32f6dbc47e739ae2a36692c91c34781dcf5e229fe248c095d77e04ed3254d6870dd47299d2a8501c59c46ee283842b7aae8c51ae81a3f357e62a9f25"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CellsModule-acc90ded32f6dbc47e739ae2a36692c91c34781dcf5e229fe248c095d77e04ed3254d6870dd47299d2a8501c59c46ee283842b7aae8c51ae81a3f357e62a9f25"' :
                                            'id="xs-components-links-module-CellsModule-acc90ded32f6dbc47e739ae2a36692c91c34781dcf5e229fe248c095d77e04ed3254d6870dd47299d2a8501c59c46ee283842b7aae8c51ae81a3f357e62a9f25"' }>
                                            <li class="link">
                                                <a href="components/AddCellsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCellsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CellsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CellsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCellsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCellsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewCellsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewCellsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CellsRoutingModule.html" data-type="entity-link" >CellsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TestChambersModule.html" data-type="entity-link" >TestChambersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TestChambersModule-3f403a7a2546618e01d453bcbe50ca4d617964c2c4ce1b8c10185ed9981bbb32203b3971d77444780ef446c3e5b2b9e2fb36685ba21e680cca51fedfc633be62"' : 'data-target="#xs-components-links-module-TestChambersModule-3f403a7a2546618e01d453bcbe50ca4d617964c2c4ce1b8c10185ed9981bbb32203b3971d77444780ef446c3e5b2b9e2fb36685ba21e680cca51fedfc633be62"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TestChambersModule-3f403a7a2546618e01d453bcbe50ca4d617964c2c4ce1b8c10185ed9981bbb32203b3971d77444780ef446c3e5b2b9e2fb36685ba21e680cca51fedfc633be62"' :
                                            'id="xs-components-links-module-TestChambersModule-3f403a7a2546618e01d453bcbe50ca4d617964c2c4ce1b8c10185ed9981bbb32203b3971d77444780ef446c3e5b2b9e2fb36685ba21e680cca51fedfc633be62"' }>
                                            <li class="link">
                                                <a href="components/AddTestChamberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddTestChamberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditTestChamberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditTestChamberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestChambersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestChambersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewTestChambersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewTestChambersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestChambersRoutingModule.html" data-type="entity-link" >TestChambersRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Anim.html" data-type="entity-link" >Anim</a>
                            </li>
                            <li class="link">
                                <a href="classes/CellClass.html" data-type="entity-link" >CellClass</a>
                            </li>
                            <li class="link">
                                <a href="classes/Dot.html" data-type="entity-link" >Dot</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestChamber.html" data-type="entity-link" >TestChamber</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CellService.html" data-type="entity-link" >CellService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComponentStoreService.html" data-type="entity-link" >ComponentStoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceDataService.html" data-type="entity-link" >DeviceDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestChamberService.html" data-type="entity-link" >TestChamberService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestDataService.html" data-type="entity-link" >TestDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestService.html" data-type="entity-link" >TestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/_TestChamber.html" data-type="entity-link" >_TestChamber</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/_TestResultDeep.html" data-type="entity-link" >_TestResultDeep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/_TestResultLight.html" data-type="entity-link" >_TestResultLight</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/_User.html" data-type="entity-link" >_User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/_UserLight.html" data-type="entity-link" >_UserLight</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadCrumbs.html" data-type="entity-link" >BreadCrumbs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cell.html" data-type="entity-link" >Cell</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CellTemplate.html" data-type="entity-link" >CellTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Channel.html" data-type="entity-link" >Channel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChannelFields.html" data-type="entity-link" >ChannelFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Charts.html" data-type="entity-link" >Charts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeviceDataLight.html" data-type="entity-link" >DeviceDataLight</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveCycle.html" data-type="entity-link" >DriveCycle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileField.html" data-type="entity-link" >FileField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InputField.html" data-type="entity-link" >InputField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MeasuredParameters.html" data-type="entity-link" >MeasuredParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayLoad.html" data-type="entity-link" >PayLoad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuickResponseMeasurement.html" data-type="entity-link" >QuickResponseMeasurement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RowInfo.html" data-type="entity-link" >RowInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectField.html" data-type="entity-link" >SelectField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SensorObj.html" data-type="entity-link" >SensorObj</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Test.html" data-type="entity-link" >Test</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TestChannel.html" data-type="entity-link" >TestChannel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TestChannelDeepChannel.html" data-type="entity-link" >TestChannelDeepChannel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TestFormat.html" data-type="entity-link" >TestFormat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TestResultDocument.html" data-type="entity-link" >TestResultDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextField.html" data-type="entity-link" >TextField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToastMsg.html" data-type="entity-link" >ToastMsg</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});