package auth

// SystemBannerManager is a structure containing all system banner manager members.
type AuthManager struct {
}

// NewSystemBannerManager creates new settings manager.
func NewSystemBannerManager(message, severity string) SystemBannerManager {
	return AuthManager{}
}

// Get implements SystemBannerManager interface. Check it for more information.
func (sbm *AuthManager) login() api.SystemBanner {
	return sbm.systemBanner
}

