package auth

import (
	"net/http"
	restful "github.com/emicklei/go-restful"
)
type AuthHandler struct {
	manager AuthManager
}
func (self* AuthHandler)regiter(ws *restful.WebService)  {
	ws.Route(
		ws.GET("/auth/login").
			To(self.login).
			Writes(api.SystemBanner{}))
}

func (self *AuthHandler) login(request *restful.Request, response *restful.Response) {
	response.WriteHeaderAndEntity(http.StatusOK, self.manager.Get())
}